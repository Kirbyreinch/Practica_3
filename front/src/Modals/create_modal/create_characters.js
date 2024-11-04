import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Createcharacter, Modifycharacter, fetchPeliculas, fetchSpecies, fetchStarships, fetchVehicles } from '../../request/characters';

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
    const [peliculas, setPeliculas] = useState([]);
    const [selectedPelicula, setSelectedPelicula] = useState('');
    const [especies, setEspecies] = useState([]);
    const [selectedEspecies, setSelectedEspecies] = useState('');
    const [naves, setNaves] = useState([]);
    const [selectedNaves, setSelectedNaves] = useState('');
    const [vehiculos, setVehiculos] = useState([]);
    const [selectedvehiculos, setSelectedvehiculos] = useState('');

    const validationSchema = Yup.object({
        Nombre: Yup.string().required('El Nombre es requerido'),
        Fecha_Nacimiento: Yup.string(),
        Color_Ojos: Yup.string(),
        Genero: Yup.string(),
        Color_Cabello: Yup.string(),
        Altura: Yup.string(),
        Masa: Yup.string(),
        Color_de_Piel: Yup.string(),
        films: Yup.array(),
        species: Yup.array(),
        starships: Yup.array(),
        vehicles: Yup.array()
    });

    useEffect(() => {
        const fetchPeliculasList = async () => {
            try {
                const response = await fetchPeliculas();
                setPeliculas(response);
                const response_species = await fetchSpecies();
                setEspecies(response_species);
                const response_starships = await fetchStarships();
                setNaves(response_starships);
                const response_vehicles = await fetchVehicles();
                setVehiculos(response_vehicles);
            } catch (error) {
                console.error("Error al obtener las películas:", error);
            }
        };

        fetchPeliculasList();
    }, []);

    return (
        <>
              <div className="overlay" onClick={handleClose}></div>
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
                        films: viewData?.films || [],
                        species: viewData?.species || [],
                        starships: viewData?.starships || [],
                        vehicles: viewData?.vehicles || [],
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
                            fetchAllRegisters();
                        } catch (error) {
                            setErrors({ submit: 'Ya hay un Personaje con ese Nombre.' });
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                    enableReinitialize
                >





                    
                    {({ isSubmitting, errors, resetForm, values, setFieldValue }) => (
                        
                        <Form>
                            <label className='titulo_modal' htmlFor="Nombre">
                                {isViewMode ? 'Ver Personaje' : (isModifyMode ? 'Modificar Personaje' : 'Agregar Personaje')}
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



                            {/*               SELECCION PELICULAS                 */}
                            <div className="peliculas-container">
                                <h3>Películas</h3>
                                <select
                                    onChange={(e) => {
                                        const selectedValue = e.target.value;
                                        if (selectedValue && !values.films.includes(selectedValue)) {
                                            const updatedFilms = [...values.films, selectedValue];
                                            setFieldValue("films", updatedFilms);
                                            setSelectedPelicula('');
                                        }
                                    }}
                                    value={selectedPelicula}
                                    disabled={isViewMode}
                                >
                                    <option value="">Selecciona una Película</option>
                                    {peliculas.map(pelicula => (
                                        <option key={pelicula._id} value={pelicula._id}>
                                            {pelicula.Titulo}
                                        </option>
                                    ))}
                                </select>



                                {/* LISTBOX PELICULAS */}
                                <div className="listbox-container">
                                    <h4>Películas Seleccionadas</h4>
                                    {values.films.length > 0 ? (
                                        <ul className="peliculas-list">
                                            {values.films.map((filmId) => {
                                                const pelicula = peliculas.find(p => p._id === filmId);
                                                return (
                                                    <li key={filmId}>
                                                        {pelicula?.Titulo || 'Desconocido'}


                                                        {/* IsViewMode CONTROLA LO QUE SE VERA  */}
                                                        {!isViewMode && (
                                                            <button className='Btn_agregar'
                                                                type="button"
                                                                onClick={() => {
                                                                    const updatedFilms = values.films.filter(film => film !== filmId);
                                                                    setFieldValue("films", updatedFilms);
                                                                }}
                                                            >X </button>
                                                        )}

                                                        
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <p>No hay Películas relacionadas.</p>
                                    )}
                                </div>
                            </div>

                            {/*               SELECCION ESPECIES                 */}
                            <div className="peliculas-container">
                                <h3>Especies</h3>
                                <select
                                    onChange={(e) => {
                                        const selectedValue = e.target.value;
                                        if (selectedValue && !values.species.includes(selectedValue)) {
                                            const updatedSpecies = [...values.species, selectedValue];
                                            setFieldValue("species", updatedSpecies);
                                            setSelectedEspecies(''); 
                                        }
                                    }}
                                    value={selectedEspecies}
                                    disabled={isViewMode}
                                >
                                    <option value="">Selecciona una Especie</option>
                                    {especies.map(especie => (
                                        <option key={especie._id} value={especie._id}>
                                            {especie.Nombre}
                                        </option>
                                    ))}
                                </select>


                                {/* LISTBOX ESPECIE */}
                                <div className="listbox-container">
                                    <h4>Especies Seleccionadas</h4>
                                    {values.species.length > 0 ? (
                                        <ul className="peliculas-list">
                                            {values.species.map((speciesid) => {
                                                const especie = especies.find(p => p._id === speciesid);
                                                return (
                                                    <li key={speciesid}>
                                                        {especie?.Nombre || 'Desconocido'}
                                                        {/* IsViewMode CONTROLA LO QUE SE VERA  */}
                                                        {!isViewMode && (
                                                            <button className='Btn_agregar'
                                                                type="button"
                                                                onClick={() => {
                                                                    const updatedSpecies = values.species.filter(specie => specie !== speciesid);
                                                                    setFieldValue("species", updatedSpecies);
                                                                }}
                                                            >X </button>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <p>No hay Especies relacionadas.</p>
                                    )}
                                </div>
                            </div>


                            {/*               SELECCION NAVES                 */}
                            <div className="peliculas-container">
                                <h3>Naves</h3>
                                <select
                                    onChange={(e) => {
                                        const selectedValue = e.target.value;
                                        if (selectedValue && !values.starships.includes(selectedValue)) {
                                            const updatedStarships = [...values.starships, selectedValue];
                                            setFieldValue("starships", updatedStarships);
                                            setSelectedNaves(''); 
                                        }
                                    }}
                                    value={selectedNaves}
                                    disabled={isViewMode}
                                >
                                    <option value="">Selecciona una Nave</option>
                                    {naves.map(nave => (
                                        <option key={nave._id} value={nave._id}>
                                            {nave.Nombre}
                                        </option>
                                    ))}
                                </select>



                                {/* LISTBOX NAVES */}
                                <div className="listbox-container">
                                    <h4>Naves Seleccionadas</h4>
                                    {values.starships.length > 0 ? (
                                        <ul className="peliculas-list">
                                            {values.starships.map((starshipsid) => {
                                                const nave = naves.find(p => p._id === starshipsid);
                                                return (
                                                    <li key={starshipsid}>
                                                        {nave?.Nombre || 'Desconocido'}
                                                        {/* IsViewMode CONTROLA LO QUE SE VERA  */}
                                                        {!isViewMode && (
                                                            <button className='Btn_agregar'
                                                                type="button"
                                                                onClick={() => {
                                                                    const updatedStarships = values.starships.filter(starship => starship !== starshipsid);
                                                                    setFieldValue("starship", updatedStarships);
                                                                }}
                                                            >X </button>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <p>No hay Naves relacionadas.</p>
                                    )}
                                </div>
                            </div>


                            {/*               SELECCION VEHICULO                 */}
                            <div className="peliculas-container">
                                <h3>Vehículos</h3>
                                <select
                                    onChange={(e) => {
                                        const selectedValue = e.target.value;
                                        if (selectedValue && !values.vehicles.includes(selectedValue)) {
                                            const updatedVehicles = [...values.vehicles, selectedValue];
                                            setFieldValue("vehicles", updatedVehicles);
                                            setSelectedvehiculos('');
                                        } else {
                                            setSelectedvehiculos(selectedValue);
                                        }
                                    }}
                                    value={selectedvehiculos}
                                    disabled={isViewMode}
                                >
                                    <option value="">Selecciona un Vehículo</option>
                                    {vehiculos.map(vehiculo => (
                                        <option key={vehiculo._id} value={vehiculo._id}>
                                            {vehiculo.Nombre}
                                        </option>
                                    ))}
                                </select>


                                {/* LISTBOX VEHICULO */}
                                <div className="listbox-container">
                                    <h4>Vehículos Seleccionados</h4>
                                    {values.vehicles.length > 0 ? (
                                        <ul className="peliculas-list">
                                            {values.vehicles.map((vehiclesid) => {
                                                const vehiculo = vehiculos.find(p => p._id === vehiclesid);
                                                return (
                                                    <li key={vehiclesid}>
                                                        {vehiculo?.Nombre || 'Desconocido'}
                                                        {/* IsViewMode CONTROLA LO QUE SE VERA  */}
                                                        {!isViewMode && (
                                                            <button className='Btn_agregar'
                                                                type="button"
                                                                onClick={() => {
                                                                    const updatedVehicles = values.vehicles.filter(vehicle => vehicle !== vehiclesid);
                                                                    setFieldValue("starship", updatedVehicles);
                                                                }}
                                                            >X </button>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <p>No hay Vehículos relacionados.</p>
                                    )}
                                </div>
                            </div>


                            {/* BOTONES */}
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
