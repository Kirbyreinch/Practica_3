import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Createspecies } from '../../request/species'; 

const MyForm = ({ handleClose, fetchSpecies, currentPage }) => {
    const validationSchema = Yup.object({
        Nombre: Yup.string().required('El título es requerido'),
        Clasificacion: Yup.string(),
        Designacion: Yup.string(),
        Estatura: Yup.string(),
        Color_de_piel: Yup.string(),
        Color_de_cabello: Yup.string(),
        Color_de_ojos: Yup.string(),
        Promedio_de_vida: Yup.string(),
        Lenguaje: Yup.string(),
    });
    return (
        <Formik
            initialValues={{ Nombre: '', Clasificacion: '', Designacion: '', Estatura: '', Color_de_piel: '', Color_de_cabello: '', Color_de_ojos: '', Promedio_de_vida: '', Lenguaje: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                try {

                    await Createspecies(values);
                    console.log("Enviando datos:", values); 
                    resetForm();
                    handleClose();
                    fetchSpecies(currentPage); 
                } catch (error) {
                    setErrors({ submit: error.message });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <label className='titulo_modal' htmlFor="Titulo">Agregar Especie</label>
                    <div className='Crear'>
                        <label htmlFor="Nombre">Nombre</label>
                        <Field name="Nombre" className="input_field" />
                        <ErrorMessage name="Nombre" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="Clasificacion">Clasificacion</label>
                        <Field name="Clasificacion" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Designacion">Designacion</label>
                        <Field name="Designacion" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Estatura">Estatura</label>
                        <Field name="Estatura" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Color_de_piel">Color_de_piel</label>
                        <Field name="Color_de_piel" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Color_de_cabello">Color_de_cabello</label>
                        <Field name="Color_de_cabello" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Color_de_ojos">Color_de_ojos</label>
                        <Field name="Color_de_ojos" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Promedio_de_vida">Promedio_de_vida</label>
                        <Field name="Promedio_de_vida" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Lenguaje">Lenguaje</label>
                        <Field name="Lenguaje" className="input_field" />
                    </div>
                    <button className='Btn_agregar' type="submit" disabled={isSubmitting}>Enviar</button>
                    <button className='Btn_agregar' onClick={handleClose}>Cerrar</button>
                </Form>
            )}
        </Formik>
    );
};

export default MyForm;
