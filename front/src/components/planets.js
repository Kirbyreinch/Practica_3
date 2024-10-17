import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/create_modal/modal';
import MyForm from '../Modals/create_modal/create_planets';
import ConfirmDeleteModal from '../Modals/Delete_modals/delete_planets';
import ModifyModelPlanets from '../Modals/modify_modals/modify_planets'
import { Deleteplanets } from '../request/planets';

function Planets() {
    const [planets, setPlanets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [planetToDelete, setPlanetToDelete] = useState(null);
    const [PlanetToModify, setPlanetToModify] = useState(null);



    //SE GUARDA LA RUTA PARA TOMAR LOS DATOS POR PAGINA //
    const fetchPlanets = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/Planetas/modulo/?page=${page}`);
            setPlanets(response.data.planets);
            setTotalPages(Math.ceil(response.data.total / 10));
        } catch (error) {
            console.error("Error al obtener los Planetas:", error);
        }
    };

    useEffect(() => {
        fetchPlanets(currentPage);
    }, [currentPage]);



    // VENTANA DE REGITRAR
    const handleOpen = () => {
        setShowDeleteModal(false);
        setShowModifyModal(false);
        setShowModal(true);
    };

    // CERRAR TODAS LAS VENTANAS
    const handleClose = () => {
        setShowModal(false);
        setShowDeleteModal(false);
        setShowModifyModal(false);
    };


    //VENTANA DE ELIMINAR
    const openDeleteModal = (planet) => {
        handleClose(); // Cerrar todos los modales
        setPlanetToDelete(planet);
        setShowDeleteModal(true);
    };
    //CERRAR VENTANA DE ELIMINAR
    const closeDeleteModal = () => {
        setPlanetToDelete(null);
        setShowDeleteModal(false);
    };


    //VENTANA DE MODIFICAR
    const openModifyModal = (planet) => {
        handleClose(); // Cerrar todos los modales
        setPlanetToModify(planet);
        setShowModifyModal(true);
    };


    //CERRAR VENTANA DE MODIFICAR
    const closeModifyModal = () => {
        setPlanetToModify(null);
        setShowModifyModal(false);
    };


    //SELECCIONAR ELIMINAR
    const handleDelete = async () => {
        if (planetToDelete) {
            try {
                await Deleteplanets(planetToDelete._id);
                fetchPlanets(currentPage);
            } catch (error) {
                console.error("Error al eliminar el Planet: ", error.message);
            } finally {
                closeDeleteModal();
            }
        }
    };


    return (
        //HTML
        <div className="contenedor">
            <div className="Titulo">
                <h1>Planetas</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar' onClick={handleOpen}>+ Agregar Registro</button>
                <Modal show={showModal} handleClose={handleClose}>
                    <MyForm handleClose={handleClose} fetchPlanets={fetchPlanets} currentPage={currentPage} />
                </Modal>
            </div>
            <div className="DatosBD">
                <table className='Table'>
                    <thead>
                        <tr>
                        <th>Nombre</th>
                            <th>Diametro</th>
                            <th>Periodo de Rotacion</th>
                            <th>Periodo Orbital</th>
                            <th>Gravedad</th>
                            <th>Poblacion</th>
                            <th>Clima</th>
                            <th>Terreno</th>
                            <th>Superficie de Agua</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planets.map(planet => (
                            <tr key={planet._id}>
                                  <td>{planet.Nombre}</td>
                                <td>{planet.Diametro}</td>
                                <td>{planet.Periodo_Rotacion}</td>
                                <td>{planet.Periodo_Orbital}</td>
                                <td>{planet.Gravedad}</td>
                                <td>{planet.Poblacion}</td>
                                <td>{planet.Clima}</td>
                                <td>{planet.Terreno}</td>
                                <td>{planet.Superficie_Agua}</td>
                                <td>
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faTrash}
                                        onClick={() => openDeleteModal(planet)}
                                    />
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faFilePen}
                                        onClick={() => openModifyModal(planet)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* PAGINACION */}
            <div className="Paginacion">
                <div className="pagination">
                    <br />
                    <button className="Btn_agregar" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                    <span> Página {currentPage} de {totalPages} </span>
                    <button className="Btn_agregar" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
                </div>
            </div>

            {/* MOSTRAR VENTANA ELIMNAR */}
            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onRequestClose={closeDeleteModal}
                onConfirm={handleDelete}
                Planet_Name={planetToDelete ? planetToDelete.Nombre : ''}
            />

            {/* MOSTRAR VENTANA MODIFICAR */}
            {showModifyModal && (
                <Modal show={showModifyModal} handleClose={closeModifyModal}>
                    <ModifyModelPlanets
                        handleClose={closeModifyModal}
                        fetchPlanets={fetchPlanets}
                        currentPage={currentPage}
                        planet={PlanetToModify}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Planets;



