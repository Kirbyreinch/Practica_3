import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createMovie } from '../../request/films'; // Asegúrate de que la ruta sea correcta

const MyForm = ({ handleClose, fetchFilms, currentPage }) => {
    const validationSchema = Yup.object({
        Titulo: Yup.string().required('El título es requerido'),
        Director: Yup.string(),
        Productor: Yup.string(),
    });
    
    return (
        <Formik
            initialValues={{ Titulo: '', Director: '', Productor: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                try {
                    await createMovie(values);
                    resetForm();
                    handleClose();
                    fetchFilms(currentPage); // Actualiza la tabla después de agregar
                } catch (error) {
                    setErrors({ submit: error.message });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
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
                    </div>
                    <div>
                        <label htmlFor="Productor">Productor</label>
                        <Field name="Productor" className="input_field" />
                    </div>
                    <div className="button-container"> {/* Contenedor para botones */}
                        <button className='Btn_agregar' type="submit" disabled={isSubmitting}>Enviar</button>
                        <button className='Btn_agregar' onClick={handleClose}>Cerrar</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default MyForm;
