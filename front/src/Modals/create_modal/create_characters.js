import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Createcharacter } from '../../request/characters';
import { Modifycharacter } from '../../request/characters';

const MyForm = ({ 
    handleClose, 
    fetchAllRegisters, 
    currentPage, 
    onSuccess, 
    setShowDeleteSuccessModal, 
    setModalType, 
    viewData, 
    isViewMode, 
    isModifyMode // Prop para el modo de modificación
}) => {
    // VALIDACIONES
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
        <>
            <div className="modal-overlay" onClick={handleClose} />
            <div className="Create_modal-content">
                <Formik
                    initialValues={{
                        Nombre: viewData?.Nombre || '',
                        Fecha_Nacimiento: viewData?.Fecha_Nacimiento || '',
                        Color_Ojos: viewData?.Color_Ojos || '',
                        Genero: viewData?.Genero || '',
                        Color_Cabello: viewData?.Color_Cabello || '',
                        Altura: viewData?.Altura || '',
                        Masa: viewData?.Masa || '',
                        Color_de_Piel: viewData?.Color_de_Piel || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                        try {
                            if (isModifyMode) {
                                await Modifycharacter(viewData._id, values); 
                            } else {
                                await Createcharacter(values); 
                            }
                            resetForm();
                            handleClose();
                            setShowDeleteSuccessModal(true); 
                            setModalType(isModifyMode ? 'modify' : 'register');  
                            onSuccess();
                            fetchAllRegisters(); // Actualiza la tabla
                        } catch (error) {
                            setErrors({ submit: 'Ya hay un Personaje con ese Nombre.' }); 
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                    enableReinitialize 
                >
                    {({ isSubmitting, errors, resetForm }) => (
                        <Form>
                            <label className='titulo_modal' htmlFor="Nombre">{isViewMode ? 'Ver Personaje' : (isModifyMode ? 'Modificar Personaje' : 'Agregar Personaje')}</label>
                            <div className='Crear'>
                                <label htmlFor="Nombre">Nombre</label>
                                <Field name="Nombre" className="input_field" disabled={isViewMode} />
                                <ErrorMessage name="Nombre" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="Fecha_Nacimiento">Fecha de Nacimiento</label>
                                <Field name="Fecha_Nacimiento" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Color_Ojos">Color de Ojos</label>
                                <Field name="Color_Ojos" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Genero">Género</label>
                                <Field name="Genero" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Color_Cabello">Color de Cabello</label>
                                <Field name="Color_Cabello" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Altura">Altura</label>
                                <Field name="Altura" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Masa">Masa</label>
                                <Field name="Masa" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Color_de_Piel">Color de Piel</label>
                                <Field name="Color_de_Piel" className="input_field" disabled={isViewMode} />
                            </div>
                            {/* SECCIÓN DE BOTONES */}
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
                    )}
                </Formik>
            </div>
        </>
    );
};

export default MyForm;
