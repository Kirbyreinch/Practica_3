import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Createplanets, Modifyplanets } from '../../request/planets';

const MyForm = ({
    handleClose,
    fetchPlanets,
    currentPage,
    onSuccess,
    setShowDeleteSuccessModal,
    setModalType,
    viewData,
    isViewMode,
    isModifyMode
}) => {
    // VALIDACIONES
    const validationSchema = Yup.object({
        Nombre: Yup.string().required('El Nombre es requerido'),
        Diametro: Yup.string(),
        Periodo_Rotacion: Yup.string(),
        Periodo_Orbital: Yup.string(),
        Gravedad: Yup.string(),
        Poblacion: Yup.string(),
        Clima: Yup.string(),
        Terreno: Yup.string(),
        Superficie_Agua: Yup.string(),
    });

    return (
        <Formik
            initialValues={{
                Nombre: viewData?.Nombre || '',
                Diametro: viewData?.Diametro || '',
                Periodo_Rotacion: viewData?.Periodo_Rotacion || '',
                Periodo_Orbital: viewData?.Periodo_Orbital || '',
                Gravedad: viewData?.Gravedad || '',
                Poblacion: viewData?.Poblacion || '',
                Clima: viewData?.Clima || '',
                Terreno: viewData?.Terreno || '',
                Superficie_Agua: viewData?.Superficie_Agua || '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                try {
                    if (isModifyMode) {
                        await Modifyplanets(viewData._id, values);
                    } else {
                        await Createplanets(values);
                    }
                    resetForm();
                    handleClose();
                    setShowDeleteSuccessModal(true);
                    setModalType(isModifyMode ? 'modify' : 'register');
                    onSuccess();
        
                } catch (error) {
                    setErrors({ submit: 'Ya hay un Planeta con ese Nombre.' });
                } finally {
                    setSubmitting(false);
                }
            }}
            enableReinitialize
        >
            {({ isSubmitting, errors, resetForm }) => (
                <>
                    <div className="overlay" onClick={() => { resetForm(); handleClose(); }}></div>
                    <div className="Create_modal-content">
                        <Form>
                            <label className='titulo_modal' htmlFor="Nombre">
                                {isViewMode ? 'Ver Planeta' : (isModifyMode ? 'Modificar Planeta' : 'Agregar Planeta')}
                                <button className='Btn_agregar' type="button" onClick={() => { resetForm(); handleClose(); }} style={{ marginLeft: '20%' }} disabled={isSubmitting}>
                                    X
                                </button>
                            </label>
                            <div className='Crear'>
                                <label htmlFor="Nombre">Nombre</label>
                                <Field name="Nombre" className="input_field" disabled={isViewMode} />
                                <ErrorMessage name="Nombre" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="Diametro">Diámetro</label>
                                <Field name="Diametro" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Periodo_Rotacion">Periodo de Rotación</label>
                                <Field name="Periodo_Rotacion" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Periodo_Orbital">Periodo Orbital</label>
                                <Field name="Periodo_Orbital" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Gravedad">Gravedad</label>
                                <Field name="Gravedad" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Poblacion">Población</label>
                                <Field name="Poblacion" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Clima">Clima</label>
                                <Field name="Clima" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Terreno">Terreno</label>
                                <Field name="Terreno" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Superficie_Agua">Superficie de Agua</label>
                                <Field name="Superficie_Agua" className="input_field" disabled={isViewMode} />
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
                    </div>
                </>
            )}
        </Formik>
    );
};

export default MyForm;
