import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Createstarships } from '../../request/starships';

const MyForm = ({ handleClose, fetchstarships, currentPage }) => {

    //VALIDACIONES
    const validationSchema = Yup.object({
        Nombre: Yup.string().required('El título es requerido'),
        Modelo: Yup.string(),
        Clase: Yup.string(),
        Tamaño: Yup.string(),
        Numero_de_Pasajeros: Yup.string(),
        Maxima_velocidad_atmosferica: Yup.string(),
        Hiperimpulsor: Yup.string(),
        MGLT: Yup.string(),
        Capacidad_de_carga: Yup.string(),
        Tiempo_Maximo_Cobustibles: Yup.string(),
    });
    
    return (
        // FORMULARIO //
        <Formik
            initialValues={{ Nombre: '', Modelo: '', Clase: '', Tamaño: '', Numero_de_Pasajeros: '', Maxima_velocidad_atmosferica: '', Hiperimpulsor: '', MGLT: '', Capacidad_de_carga: '', Tiempo_Maximo_Cobustibles: ''  }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                try {
                    await Createstarships(values);
                    resetForm();
                    handleClose();
                    fetchstarships(currentPage); // ACTUALIZA LA TABLA
                } catch (error) {
                    setErrors({ submit: error.message });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                     // FORMULARIO  HTML//
                <Form>
                    <label className='titulo_modal' htmlFor="Titulo">Agregar Nave</label>
                    <div className='Crear'>
                        <label htmlFor="Nombre">Nombre</label>
                        <Field name="Nombre" className="input_field" />
                        <ErrorMessage name="Nombre" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="Modelo">Modelo</label>
                        <Field name="Modelo" className="input_field" />
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
                        <label htmlFor="Maxima_velocidad_atmosferica">Maxima velocidad_atmosferica</label>
                        <Field name="Maxima_velocidad_atmosferica" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Hiperimpulsor">Hiperimpulsor</label>
                        <Field name="Hiperimpulsor" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="MGLT">MGLT</label>
                        <Field name="MGLT" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Capacidad_de_carga">Capacidad de carga </label>
                        <Field name="Capacidad_de_carga" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Tiempo_Maximo_Cobustibles">Tiempo Maximo Cobustibles</label>
                        <Field name="Tiempo_Maximo_Cobustibles" className="input_field" />
                    </div>
           
                    <div className="button-container"> 
                        <button className='Btn_agregar' type="submit" disabled={isSubmitting}>Enviar</button>
                        <button className='Btn_agregar' onClick={handleClose}>Cerrar</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default MyForm;
