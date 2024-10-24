import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modifyspecies } from '../../request/species';

const ModifyModelSpecies = ({ handleClose, fetchSpecies, currentPage, specie, onSuccess }) => {
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
        <>
            <div className="modal-overlay" onClick={handleClose} />
            <div className="Create_modal-content">
                <Formik
                    initialValues={{
                        Nombre: specie.Nombre || '',
                        Clasificacion: specie.Clasificacion || '',
                        Designacion: specie.Designacion || '',
                        Estatura: specie.Estatura || '',
                        Color_de_piel: specie.Color_de_piel || '',
                        Color_de_cabello: specie.Color_de_cabello || '',
                        Color_de_ojos: specie.Color_de_ojos || '',
                        Promedio_de_vida: specie.Promedio_de_vida || '',
                        Lenguaje: specie.Lenguaje || '',

                    }}
                    validationSchema={validationSchema}
                    enableReinitialize={true} // Permite que los valores iniciales se actualicen cuando la prop cambie
                    onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                        try {
                            // TIEMPO QUE GIRARA EL SPINNER
                            await new Promise(resolve => setTimeout(resolve, 2000));
                            await Modifyspecies(specie._id, values);
                            resetForm();
                            handleClose();
                            onSuccess();
                            fetchSpecies(currentPage);
                        } catch (error) {
                            setErrors({ submit: error.message });
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            <label className='Nombre_modal' htmlFor="Nombre">Modificar Especie</label>
                            <div className='Crear'>
                                <label htmlFor="Nombre">Nombre</label>
                                <Field name="Nombre" className="input_field" />
                                <ErrorMessage name="Nombre" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="Clasificacion">Clasificación</label>
                                <Field name="Clasificacion" className="input_field" />
                            </div>
                            <div>
                                <label htmlFor="Designacion">Designación</label>
                                <Field name="Designacion" className="input_field" />
                            </div>
                            <div>
                                <label htmlFor="Estatura">Estatura</label>
                                <Field name="Estatura" className="input_field" />
                            </div>
                            <div>
                                <label htmlFor="Color_de_piel">Color de Piel</label>
                                <Field name="Color_de_piel" className="input_field" />
                            </div>
                            <div>
                                <label htmlFor="Color_de_cabello">Color de Cabello</label>
                                <Field name="Color_de_cabello" className="input_field" />
                            </div>
                            <div>
                                <label htmlFor="Color_de_ojos">Color de Ojos</label>
                                <Field name="Color_de_ojos" className="input_field" />
                            </div>
                            <div>
                                <label htmlFor="Promedio_de_vida">Promedio de vida</label>
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
            </div>
        </>
    );
};

export default ModifyModelSpecies;
