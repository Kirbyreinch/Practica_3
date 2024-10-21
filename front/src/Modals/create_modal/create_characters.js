import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Createcharacter } from '../../request/characters';

const MyForm = ({ handleClose, fetchCharacter, currentPage, onSuccess }) => {

    //VALIDACIONES
    const validationSchema = Yup.object({
        Nombre: Yup.string().required('El Nombre es requerido'),
        Fecha_Nacimiento: Yup.string(),
        Color_Ojos: Yup.string(),
        Genero: Yup.string(),
        Color_Cabello: Yup.string(),
        Altura: Yup.string(),
        Masa: Yup.string(),
        Color_de_Piel: Yup.string(),
    });

    return (
        // FORMULARIO //
        <>
            <div className="modal-overlay" onClick={handleClose} />
            <div className="Create_modal-content">

                <Formik
                    initialValues={{ Nombre: '', Fecha_Nacimiento: '', Color_Ojos: '', Genero: '', Color_Cabello: '', Altura: '', Masa: '', Color_de_Piel: '' }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                        try {
                            // TIEMPO QUE GIRARA EL SPINNER
                            await new Promise(resolve => setTimeout(resolve, 2000));
                            await Createcharacter(values);
                            resetForm();
                            handleClose();
                            onSuccess();
                            fetchCharacter(currentPage); // ACTUALIZA LA TABLA
                        } catch (error) {
                            setErrors({ submit: 'Ya hay un Personaje con ese Nombre.' }); // MENSAJE DE ERROR SI EL PERSONAJE "YA EXISTE"
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, errors }) => (
                        // FORMULARIO  HTML//
                        <Form>
                            <label className='titulo_modal' htmlFor="Titulo">Agregar Personaje</label>
                            <div className='Crear'>
                                <label htmlFor="Nombre">Nombre</label>
                                <Field name="Nombre" className="input_field" />
                                <ErrorMessage name="Nombre" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="Fecha_Nacimiento">Fecha_Nacimiento</label>
                                <Field name="Fecha_Nacimiento" className="input_field" />
                            </div>
                            <div>
                                <label htmlFor="Color_Ojos">Color_Ojos</label>
                                <Field name="Color_Ojos" className="input_field" />
                            </div>
                            <div>
                                <label htmlFor="Genero">Genero</label>
                                <Field name="Genero" className="input_field" />
                            </div>
                            <div>
                                <label htmlFor="Color_Cabello">Color_Cabello</label>
                                <Field name="Color_Cabello" className="input_field" />
                            </div>
                            <div>
                                <label htmlFor="Altura">Altura</label>
                                <Field name="Altura" className="input_field" />
                            </div>
                            <div>
                                <label htmlFor="Masa">Masa</label>
                                <Field name="Masa" className="input_field" />
                            </div>
                            <div>
                                <label htmlFor="Color_de_Piel">Color_de_Piel</label>
                                <Field name="Color_de_Piel" className="input_field" />
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

export default MyForm;
