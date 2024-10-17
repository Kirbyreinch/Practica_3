import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Createvehicles } from '../../request/vehicles';

const MyForm = ({ handleClose, fetchVehicles, currentPage }) => {
    //VALIDACIONES
    const validationSchema = Yup.object({
        Nombre: Yup.string().required('El Nombre es requerido'),
        Modelo: Yup.string().required('El Modelo es requerido'),
        Clase: Yup.string(),
        Tamaño: Yup.string(),
        Numero_de_Pasajeros: Yup.string(),
        Maxima_velocidad_atmosferica: Yup.string(),
        Capacidad_Maxima: Yup.string(),
        Tiempo_Maximo_Cobustibles: Yup.string(),

    });

    return (
        // FORMULARIO //
        <Formik
            initialValues={{ Nombre: '', Modelo: '', Clase: '', Tamaño: '', Numero_de_Pasajeros: '', Maxima_velocidad_atmosferica: '', Capacidad_Maxima: '', Tiempo_Maximo_Cobustibles: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {

                try {
                    // TIEMPO QUE GIRARA EL SPINNER
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    await Createvehicles(values);
                    resetForm();
                    handleClose();
                    fetchVehicles(currentPage); // ACTUALIZA LA TABLA
                } catch (error) {
                    setErrors({ submit: 'Ya hay un Vehiculo con ese Nombre.' }); // MENSAJE DE ERROR SI EL VEHICULO  "YA EXISTE"
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, errors }) => (
                // FORMULARIO  HTML//
                <Form>
                    <label className='titulo_modal' htmlFor="Titulo">Agregar Vehiculo</label>
                    <div className='Crear'>
                        <label htmlFor="Nombre">Nombre</label>
                        <Field name="Nombre" className="input_field" />
                        <ErrorMessage name="Nombre" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="Modelo">Modelo</label>
                        <Field name="Modelo" className="input_field" />
                        <ErrorMessage name="Modelo" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="Clase">Clase</label>
                        <Field name="Clase" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Tamaño">Tamaño</label>
                        <Field name="Tamaño" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Numero_de_Pasajeros">Numero de Pasajeros</label>
                        <Field name="Numero_de_Pasajeros" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Maxima_velocidad_atmosferica">Maxima velocidad atmosferica</label>
                        <Field name="Maxima_velocidad_atmosferica" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Capacidad_Maxima">Capacidad Maxima</label>
                        <Field name="Capacidad_Maxima" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Tiempo_Maximo_Cobustibles">Tiempo Maximo de Cobustibles</label>
                        <Field name="Tiempo_Maximo_Cobustibles" className="input_field" />
                    </div>
                    {/* SECCION DE BOTONES*/}
                    {errors.submit && <div className="error-message">{errors.submit}</div>}
                    <div className="button-container">
                        <button className='Btn_agregar' type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <div class="lds-hourglass"></div> : 'Enviar'}
                        </button>
                        <button className='Btn_agregar' type="button" onClick={handleClose} disabled={isSubmitting}>
                            Cerrar
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default MyForm;
