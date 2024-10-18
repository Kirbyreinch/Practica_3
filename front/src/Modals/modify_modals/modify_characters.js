import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modifycharacter } from '../../request/characters';

const ModifyModelCharacter = ({ handleClose, fetchCharacter, currentPage, character,  onSuccess  }) => {

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
        <Formik
            initialValues={{
                Nombre: character.Nombre || '',
                Fecha_Nacimiento: character.Fecha_Nacimiento || '',
                Color_Ojos: character.Color_Ojos || '',
                Genero: character.Genero || '',
                Color_Cabello: character.Color_Cabello || '',
                Altura: character.Altura || '',
                Masa: character.Masa || '',
                Color_de_Piel: character.Color_de_Piel || '',
            }}

            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                try {
                    // TIEMPO QUE GIRARA EL SPINNER
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await Modifycharacter(character._id, values);
                    resetForm();
                    handleClose();
                    onSuccess();
                    fetchCharacter(currentPage); // ACTUALIZA LA TABLA
                } catch (error) {
                    setErrors({ submit: 'Ya hay un Personaje con ese Nombre.' }); // MENSAJE DE ERROR SI EL PERSONAJE "YA EXISTE" //
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, errors }) => (
                // FORMULARIO  HTML//
                <Form>
                    <label className='titulo_modal' htmlFor="Titulo">Modificar Personaje</label>
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
    );
};

export default ModifyModelCharacter;
