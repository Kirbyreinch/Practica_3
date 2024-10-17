import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { modifyMovie } from '../../request/films';

const ModifyFilmForm = ({ handleClose, fetchFilms, currentPage, film }) => {
    const validationSchema = Yup.object({
        Titulo: Yup.string().required('El Título es requerido'),
        Director: Yup.string().required('El Director es requerido'),
        Productor: Yup.string().required('El Producto es requerido'),
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
                    // TIEMPO QUE GIRARA EL SPINNER
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await modifyMovie(film._id, values);
                    resetForm();
                    handleClose();
                    fetchFilms(currentPage);
                } catch (error) {
                    setErrors({ submit: 'Ya hay una película con ese Título.' }); // MENSAJE DE ERROR SI LA PELICULA "YA EXISTE"
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, errors }) => (
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
                    {/* SECCION DE BOTONES*/}
                    {errors.submit && <div className="error-message">{errors.submit}</div>}
                    <div className="button-container">
                        <button className='Btn_agregar' type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <div class="lds-hourglass"></div> : 'Modificar'}
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

export default ModifyFilmForm;
