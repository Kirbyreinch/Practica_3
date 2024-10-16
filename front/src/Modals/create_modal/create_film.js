import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createMovie } from '../../request/films';

const MyForm = ({ handleClose, fetchFilms, currentPage }) => {

    //VALIDACIONES
    const validationSchema = Yup.object({
        Titulo: Yup.string().required('El título es requerido'),
        Director: Yup.string(),
        Productor: Yup.string(),
    });
    
    return (
        // FORMULARIO //
        <Formik
            initialValues={{ Titulo: '', Director: '', Productor: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                try {
                    await createMovie(values);
                    resetForm();
                    handleClose();
                    fetchFilms(currentPage); // ACTUALIZA LA TABLA
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
                    <label className='titulo_modal' htmlFor="Titulo">Agregar Pelicula</label>
                    <div className='Crear'>
                        <label htmlFor="Titulo">Título</label>
                        <Field name="Titulo" className="input_field" />
                        <ErrorMessage name="Titulo" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="Director">Director</label>
                        <Field name="Director" className="input_field" />
                    </div>
                    <div>
                        <label htmlFor="Productor">Productor</label>
                        <Field name="Productor" className="input_field" />
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
