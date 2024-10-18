import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createMovie } from '../../request/films';

const MyForm = ({ handleClose, fetchFilms, currentPage,  onSuccess }) => {

    // VALIDACIONES
    const validationSchema = Yup.object({
        Titulo: Yup.string().required('El Título es requerido'),
        Director: Yup.string().required('El Director es requerido'),
        Productor: Yup.string().required('El Producto es requerido'),
    });

    return (
        // FORMULARIO
        <Formik
            initialValues={{ Titulo: '', Director: '', Productor: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                try {
                    // TIEMPO QUE GIRARA EL SPINNER
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    await createMovie(values);
                    resetForm();
                    handleClose();
                    onSuccess();
                    fetchFilms(currentPage); // ACTUALIZA LA TABLA
                } catch (error) {

                    setErrors({ submit: 'Ya hay una película con ese Título.' }); // MENSAJE DE ERROR SI LA PELICULA "YA EXISTE"
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, errors }) => (
                // FORMULARIO HTML
                <Form>
                    <label className='titulo_modal' htmlFor="Titulo">Agregar Película</label>
                    <div className='Crear'>
                        <label htmlFor="Titulo">Título</label>
                        <Field name="Titulo" className="input_field" />
                        <ErrorMessage name="Titulo" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="Director">Director</label>
                        <Field name="Director" className="input_field" />
                        <ErrorMessage name="Director" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="Productor">Productor</label>
                        <Field name="Productor" className="input_field" />
                        <ErrorMessage name="Productor" component="div" className="error-message" />
                    </div>
                    {/* SECCION DE BOTONES*/}
                    {errors.submit && <div className="error-message">{errors.submit}</div>}
                    <div className="button-container">
                        <button className='Btn_agregar' type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <div className="lds-hourglass"></div> : 'Enviar'}
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
