import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modifyvehicles } from '../../request/vehicles';

const ModifyModelVehicles = ({ handleClose, fetchsvehicles, currentPage, vehicle }) => {
    const validationSchema = Yup.object({
        Nombre: Yup.string().required('El título es requerido'),
        Modelo: Yup.string(),
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
                Nombre: vehicle.Nombre || '', 
                Modelo: vehicle.Modelo || '', 
                Clase: vehicle.Clase || '' ,
                Tamaño: vehicle.Tamaño || '', 
                Numero_de_Pasajeros: vehicle.Numero_de_Pasajeros || '', 
                Maxima_velocidad_atmosferica: vehicle.Maxima_velocidad_atmosferica || '' ,
                Capacidad_Maxima: vehicle.Capacidad_Maxima || '', 
                Tiempo_Maximo_Cobustibles: vehicle.Tiempo_Maximo_Cobustibles || '',
            }}
            validationSchema={validationSchema}
            enableReinitialize={true} // Permite que los valores iniciales se actualicen cuando la prop cambie
            onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                try {
                    await Modifyvehicles(vehicle._id, values); 
                    resetForm();
                    handleClose();
                    fetchsvehicles(currentPage);
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
     <label className='titulo_modal' htmlFor="Titulo">Agregar Vehiculo</label>
     <div className='Crear'>
         <label htmlFor="Nombre">Nombre</label>
         <Field name="Nombre" className="input_field" />
         <ErrorMessage name="Nombre" component="div" className="error-message" />
     </div>
     <div>
         <label htmlFor="Modelo">Modelo</label>
         <Field name="Modelo" className="input_field" />
     </div>
     <div>
         <label htmlFor="Clase">Clase</label>
         <Field name="Clase" className="input_field" />
     </div>
     <div>
         <label htmlFor="Tamaño">Tamaño</label>
         <Field name="Tamaño" className="input_field" />
     </div>
     <div>
         <label htmlFor="Numero_de_Pasajeros">Numero de Pasajeros</label>
         <Field name="Numero_de_Pasajeros" className="input_field" />
     </div>
     <div>
         <label htmlFor="Maxima_velocidad_atmosferica">Maxima velocidad atmosferica</label>
         <Field name="Maxima_velocidad_atmosferica" className="input_field" />
     </div>
     <div>
         <label htmlFor="Tiempo_Maximo_Cobustibles">Tiempo Maximo de Cobustibles</label>
         <Field name="Tiempo_Maximo_Cobustibles" className="input_field" />
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

export default ModifyModelVehicles;
