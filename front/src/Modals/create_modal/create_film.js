import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createMovie, modifyMovie } from '../../request/films';
import './create.css'; // Asegúrate de tener el CSS adecuado

const MyForm = ({
    handleClose,
    fetchAllRegisters,
    currentPage,
    onSuccess,
    setShowDeleteSuccessModal,
    setModalType,
    viewData,
    isViewMode,
    isModifyMode
}) => {
    const validationSchema = Yup.object({
        Titulo: Yup.string().required('El Título es requerido'),
        Director: Yup.string().required('El Director es requerido'),
        Productor: Yup.string().required('El Producto es requerido'),
    });

    const handleSubmit = async (values, { resetForm, setSubmitting, setErrors }) => {
        try {
            if (isModifyMode) {
                await modifyMovie(viewData._id, values);
            } else {
                await createMovie(values);
                setModalType('add');
            }
            resetForm();
            handleClose();
            setShowDeleteSuccessModal(true);
            onSuccess();
        } catch (error) {
            setErrors({ submit: 'Ya hay una película con ese Título.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    Titulo: viewData?.Titulo || '',
                    Director: viewData?.Director || '',
                    Productor: viewData?.Productor || '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting, errors, resetForm }) => (
                    <>
                        <div className="overlay" onClick={() => { resetForm(); handleClose(); }}></div>
                        <div className="Create_modal-content">
                            <Form>
                                <label className='titulo_modal' htmlFor="Titulo">
                                    {isViewMode ? 'Ver Película' : (isModifyMode ? 'Modificar Película' : 'Agregar Película')}
                                    <button className='Btn_agregar' type="button" onClick={() => { resetForm(); handleClose(); }} style={{ marginLeft: '20%' }} disabled={isSubmitting}>
                                        X
                                    </button>
                                </label>
                                <div className='Crear'>
                                    <label htmlFor="Titulo">Título</label>
                                    <Field name="Titulo" className="input_field" disabled={isViewMode} />
                                    <ErrorMessage name="Titulo" component="div" className="error-message" />
                                </div>
                                <div>
                                    <label htmlFor="Director">Director</label>
                                    <Field name="Director" className="input_field" disabled={isViewMode} />
                                    <ErrorMessage name="Director" component="div" className="error-message" />
                                </div>
                                <div>
                                    <label htmlFor="Productor">Productor</label>
                                    <Field name="Productor" className="input_field" disabled={isViewMode} />
                                    <ErrorMessage name="Productor" component="div" className="error-message" />
                                </div>
                                {errors.submit && <div className="error-message">{errors.submit}</div>}
                                <div className="button-container">
                                    {!isViewMode && (
                                        <button className='Btn_agregar' type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? <div className="lds-hourglass"></div> : (isModifyMode ? 'Modificar' : 'Enviar')}
                                        </button>
                                    )}
                                    <button className='Btn_agregar' type="button" onClick={() => { resetForm(); handleClose(); }} disabled={isSubmitting}>
                                        Cerrar
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </>
                )}
            </Formik>
        </>
    );
};

export default MyForm;
