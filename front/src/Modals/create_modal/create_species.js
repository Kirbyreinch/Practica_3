import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Createspecies } from '../../request/species';

const MyForm = ({ handleClose, fetchSpecies, currentPage }) => {
    const validationSchema = Yup.object({
        Nombre: Yup.string().required('El Nombre es requerido'),
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
                    // TIEMPO QUE GIRARA EL SPINNER
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await Createspecies(values);
                    console.log("Enviando datos:", values);
                    resetForm();
                    handleClose();
                    fetchSpecies(currentPage);
                } catch (error) {
                    setErrors({ submit: 'Ya hay una Especie con ese Nombre.' }); // MENSAJE DE ERROR SI LA ESPECIE "YA EXISTE"
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, errors }) => (
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
