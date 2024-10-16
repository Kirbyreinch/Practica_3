import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modifyplanets } from '../../request/planets';

const ModifyModelPlanets = ({ handleClose, fetchCharacters, currentPage, planets }) => {

    //VALIDACIONES
    const validationSchema = Yup.object({
        Nombre: Yup.string().required('El título es requerido'),
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
        // FORMULARIO //
        <Formik
            initialValues={{ Nombre: planets.Nombre || '', 
                             Diametro: planets.Diametro || '',  
                             Periodo_Rotacion: planets.Periodo_Rotacion || '', 
                             Periodo_Orbital: planets.Periodo_Orbital || '', 
                             Color_Cabello: planets.Color_Cabello || '',  
                             Gravedad: planets.Gravedad || '', 
                             Poblacion: planets.Poblacion || '',  
                             Clima: planets.Clima || '', 
            }}
            
            
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
                try {
                    await Modifyplanets(values);
                    resetForm();
                    handleClose();
                    fetchCharacters(currentPage); // ACTUALIZA LA TABLA
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
                     <label className='titulo_modal' htmlFor="Titulo">Modificar Planeta</label>
                     <div className='Crear'>
                         <label htmlFor="Nombre">Nombre</label>
                         <Field name="Nombre" className="input_field" />
                         <ErrorMessage name="Nombre" component="div" className="error-message" />
                     </div>
                     <div>
                         <label htmlFor="Diametro">Diametro</label>
                         <Field name="Diametro" className="input_field" />
                     </div>
                     <div>
                         <label htmlFor="Periodo_Rotacion">Periodo_Rotacion</label>
                         <Field name="Periodo_Rotacion" className="input_field" />
                     </div>
                     <div>
                         <label htmlFor="Periodo_Orbital">Periodo_Orbital</label>
                         <Field name="Periodo_Orbital" className="input_field" />
                     </div>
                     <div>
                         <label htmlFor="Gravedad">Gravedad</label>
                         <Field name="Gravedad" className="input_field" />
                     </div>
                     <div>
                         <label htmlFor="Poblacion">Poblacion</label>
                         <Field name="Poblacion" className="input_field" />
                     </div>
                     <div>
                         <label htmlFor="Clima">Clima</label>
                         <Field name="Clima" className="input_field" />
                     </div>
                     <div>
                         <label htmlFor="Terreno">Terreno</label>
                         <Field name="Terreno" className="input_field" />
                     </div>
                     <div>
                         <label htmlFor="Superficie_Agua">Superficie_Agua</label>
                         <Field name="Superficie_Agua" className="input_field" />
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

export default ModifyModelPlanets;
