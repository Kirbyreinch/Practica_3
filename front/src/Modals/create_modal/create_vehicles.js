import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Createvehicles, Modifyvehicles } from '../../request/vehicles';

const MyForm = ({
    handleClose,
    fetchVehicles,
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
        Modelo: Yup.string().required('El Modelo es requerido'),
        Clase: Yup.string(),
        Tamaño: Yup.string(),
        Numero_de_Pasajeros: Yup.string(),
        Maxima_velocidad_atmosferica: Yup.string(),
        Capacidad_Maxima: Yup.string(),
        Tiempo_Maximo_Cobustibles: Yup.string(),
    });

    return (
        <Formik
            initialValues={{
                Nombre: viewData?.Nombre || '',
                Modelo: viewData?.Modelo || '',
                Clase: viewData?.Clase || '',
                Tamaño: viewData?.Tamaño || '',
                Numero_de_Pasajeros: viewData?.Numero_de_Pasajeros || '',
                Maxima_velocidad_atmosferica: viewData?.Maxima_velocidad_atmosferica || '',
                Capacidad_Maxima: viewData?.Capacidad_Maxima || '',
                Tiempo_Maximo_Cobustibles: viewData?.Tiempo_Maximo_Cobustibles || '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                try {
                    if (isModifyMode) {
                        await Modifyvehicles(viewData._id, values); // Modifica el vehículo existente
                    } else {
                        await Createvehicles(values); // Crea un nuevo vehículo
                    }
                    resetForm();
                    handleClose();
                    setModalType(isModifyMode ? 'modify' : 'register');
                    setShowDeleteSuccessModal(true);
                    onSuccess();
                } catch (error) {
                    setErrors({ submit: 'Ya hay un Vehículo con ese Nombre.' }); // Mensaje de error si el vehículo "ya existe"
                } finally {
                    setSubmitting(false);
                }
            }}
            enableReinitialize // Permite reiniciar el formulario cuando cambian los datos de vista
        >
            {({ isSubmitting, errors, resetForm }) => (
                <>
                    <div className="overlay" onClick={() => { resetForm(); handleClose(); }}></div>
                    <div className="Create_modal-content">
                        <Form>
                            <label className='titulo_modal' htmlFor="Titulo">
                                {isViewMode ? 'Ver Vehículo' : (isModifyMode ? 'Modificar Vehículo' : 'Agregar Vehículo')}
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
                                <label htmlFor="Modelo">Modelo</label>
                                <Field name="Modelo" className="input_field" disabled={isViewMode} />
                                <ErrorMessage name="Modelo" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="Clase">Clase</label>
                                <Field name="Clase" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Tamaño">Tamaño</label>
                                <Field name="Tamaño" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Numero_de_Pasajeros">Número de Pasajeros</label>
                                <Field name="Numero_de_Pasajeros" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Maxima_velocidad_atmosferica">Máxima Velocidad Atmosférica</label>
                                <Field name="Maxima_velocidad_atmosferica" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Capacidad_Maxima">Capacidad Máxima</label>
                                <Field name="Capacidad_Maxima" className="input_field" disabled={isViewMode} />
                            </div>
                            <div>
                                <label htmlFor="Tiempo_Maximo_Cobustibles">Tiempo Máximo de Combustibles</label>
                                <Field name="Tiempo_Maximo_Cobustibles" className="input_field" disabled={isViewMode} />
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
