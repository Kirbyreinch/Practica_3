import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { modifyMovie } from '../../request/films';

const ModifyFilmForm = ({ handleClose, fetchFilms, currentPage, film }) => {
    const validationSchema = Yup.object({
        Titulo: Yup.string().required('El título es requerido'),
        Director: Yup.string(),
        Productor: Yup.string(),
    });

    return (
        <Formik
            initialValues={{ 
                Titulo: film.Titulo || '', 
                Director: film.Director || '', 
                Productor: film.Productor || '' 
            }}
            validationSchema={validationSchema}
            enableReinitialize={true} // Permite que los valores iniciales se actualicen cuando la prop cambie
            onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                try {
                    await modifyMovie(film._id, values); 
                    resetForm();
                    handleClose();
                    fetchFilms(currentPage);
                } catch (error) {
                    setErrors({ submit: error.message });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <label className='titulo_modal' htmlFor="Titulo">Modificar Película</label>
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
                    <button className='Btn_agregar' type="submit" disabled={isSubmitting}>Modificar</button>
                    <button className='Btn_agregar' onClick={handleClose}>Cerrar</button>
                </Form>
            )}
        </Formik>
    );
};

export default ModifyFilmForm;
