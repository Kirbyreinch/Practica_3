import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modifyplanets } from '../../request/planets';

const ModifyModelPlanets = ({ handleClose, fetchPlanets, currentPage, planet }) => {

    //VALIDACIONES
    const validationSchema = Yup.object({
        Nombre: Yup.string().required('El Nombre es requerido'),
        Diametro: Yup.string(),
        Periodo_Rotacion: Yup.string(),
        Periodo_Orbital: Yup.string(),
        Gravedad: Yup.string(),
        Poblacion: Yup.string(),
        Clima: Yup.string(),
        Terreno: Yup.string(),
        Superficie_Agua: Yup.string(),
    });

    return (
        // FORMULARIO //
        <Formik
            initialValues={{
                Nombre: planet.Nombre || '',
                Diametro: planet.Diametro || '',
                Periodo_Rotacion: planet.Periodo_Rotacion || '',
                Periodo_Orbital: planet.Periodo_Orbital || '',
                Color_Cabello: planet.Color_Cabello || '',
                Gravedad: planet.Gravedad || '',
                Poblacion: planet.Poblacion || '',
                Clima: planet.Clima || '',
                Terreno: planet.Terreno || '',
                Superficie_Agua: planet.Superficie_Agua || '',
            }}


            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                try {
                    // TIEMPO QUE GIRARA EL SPINNER
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await Modifyplanets(planet._id, values);
                    resetForm();
                    handleClose();
                    fetchPlanets(currentPage); // ACTUALIZA LA TABLA
                } catch (error) {
                    setErrors({ submit: 'Ya hay un Planeta con ese Nombre.' }); // MENSAJE DE ERROR SI EL PLANETA "YA EXISTE"
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, errors }) => (
                // FORMULARIO  HTML//
                <Form>
                    <label className='titulo_modal' htmlFor="Titulo">Modificar Planeta</label>
                    <div className='Crear'>
                        <label htmlFor="Nombre">Nombre</label>
                        <Field name="Nombre" className="input_field" />
                        <ErrorMessage name="Nombre" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="Diametro">Diametro</label>
                        <Field name="Diametro" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Periodo_Rotacion">Periodo de Rotacion</label>
                        <Field name="Periodo_Rotacion" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Periodo_Orbital">Periodo Orbital</label>
                        <Field name="Periodo_Orbital" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Gravedad">Gravedad</label>
                        <Field name="Gravedad" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Poblacion">Poblacion</label>
                        <Field name="Poblacion" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Clima">Clima</label>
                        <Field name="Clima" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Terreno">Terreno</label>
                        <Field name="Terreno" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Superficie_Agua">Superficie de Agua</label>
                        <Field name="Superficie_Agua" className="input_field" />
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

export default ModifyModelPlanets;
