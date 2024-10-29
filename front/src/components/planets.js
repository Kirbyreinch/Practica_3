import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/create_modal/modal';
import MyForm from '../Modals/create_modal/create_planets';
import ConfirmDeleteModal from '../Modals/Delete_modals/delete_planets';
import ModifyModelPlanets from '../Modals/modify_modals/modify_planets';
import { Deleteplanets } from '../request/planets';
import DeleteComplete from '../Modals/message_modal/delete_modal';
import ViewModal from '../Modals/view_modal/view_planets';
import Header from '../header/header';

function Planets() {
    const [planets, setPlanets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    const [planetToDelete, setPlanetToDelete] = useState(null);
    const [PlanetToModify, setPlanetToModify] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [view, setToView] = useState(null);
    const [filtered, setFiltered] = useState([]);
    const [allRegisters, setAllRegisters] = useState([]);    
    const [modalType, setModalType] = useState(null); //    ESTADO PARA MENSAJES MODAL  //


    const limit = 10;
    const fetchregister = async (page) => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedPlanets = filtered.slice(startIndex, endIndex);
        setPlanets(paginatedPlanets);
        setTotalPages(Math.ceil(filtered.length / limit));
    };

    const fetchAllRegisters = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/Planetas/modulo/todos`);
            setAllRegisters(response.data.planets);
            setFiltered(response.data.planets); 
            setTotalPages(Math.ceil(response.data.total / limit));
            fetchregister(1); 
        } catch (error) {
            console.error("Error al obtener todos los planetas:", error);
        }
    };

    useEffect(() => {
        fetchAllRegisters(); 
    }, []);

    useEffect(() => {
        fetchregister(currentPage); 
    }, );

    const handleOpen = () => {
        setShowDeleteModal(false);
        setShowModifyModal(false);
        setShowModal(true);
    };

    const handleClose = () => {
        fetchAllRegisters();
        setShowModal(false);
        setShowDeleteModal(false);
        setShowModifyModal(false);
        setShowViewModal(false);
    };

    const openDeleteModal = (planet) => {
        handleClose();
        setPlanetToDelete(planet);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setPlanetToDelete(null);
        setShowDeleteModal(false);
    };

    const openModifyModal = (planet) => {
        handleClose();
        setPlanetToModify(planet);
        setModalType('modify');
        setShowModifyModal(true);
    };

    const closeModifyModal = () => {
        setPlanetToModify(null);
        setShowModifyModal(false);
    };

    const openViewModal = (planet) => {
        handleClose();
        setToView(planet);
        setShowViewModal(true);
    };

    const closeViewModal = () => {
        setToView(null);
        setShowViewModal(false);
    };

    const handleSearch = (text) => {
        const trimmedText = text.trim().toLowerCase();
        let filteredResults = allRegisters;

        if (trimmedText) {
            filteredResults = allRegisters.filter(planet =>
                planet.Nombre.toLowerCase().startsWith(trimmedText)
            );
        }

        setFiltered(filteredResults);
        setCurrentPage(1); 
    };

    const GetHomologation = (value) => {
        if (value === "unknown" || value === "N/A" || value === "n/a" || value === "none" || value === "") {
            return "-----";
        }
        return value || "-----";
    };

    const handleDelete = async () => {
        if (planetToDelete) {
            try {
                await Deleteplanets(planetToDelete._id);
                setModalType('delete');
                setShowDeleteSuccessModal(true);
                fetchAllRegisters(); 
            } catch (error) {
                console.error("Error al eliminar el planeta: ", error.message);
            } finally {
                closeDeleteModal();
            }
        }
    };

    return (
        <div className="contenedor">
            <Header onSearch={handleSearch} /> 
            <div className="Titulo">
                <h1>Planetas</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar' onClick={handleOpen}>+ Agregar Registro</button>
                <Modal show={showModal} handleClose={handleClose}>
                    <MyForm handleClose={handleClose} fetchCharacter={fetchregister} currentPage={currentPage}
                        onSuccess={() => {
                            handleClose();
                        }} />
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
                                <td>{GetHomologation(planet.Nombre)}</td>
                                <td>{GetHomologation(planet.Diametro)}</td>
                                <td>{GetHomologation(planet.Periodo_Rotacion)}</td>
                                <td>{GetHomologation(planet.Periodo_Orbital)}</td>
                                <td>{GetHomologation(planet.Gravedad)}</td>
                                <td>{GetHomologation(planet.Poblacion)}</td>
                                <td>{GetHomologation(planet.Clima)}</td>
                                <td>{GetHomologation(planet.Terreno)}</td>
                                <td>{GetHomologation(planet.Superficie_Agua)}</td>
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
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faEye}
                                        onClick={() => openViewModal(planet)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="Paginacion">
                <div className="pagination">
                    <br />
                    <button className="Btn_agregar" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                    <span> Página {currentPage} de {totalPages} </span>
                    <button className="Btn_agregar" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
                </div>
            </div>

            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onRequestClose={closeDeleteModal}
                onConfirm={handleDelete}
                Planet_Name={planetToDelete ? planetToDelete.Nombre : ''}
                modalType={modalType}
            />

            <DeleteComplete
                show={showDeleteSuccessModal}
                handleClose={() => {
                    setShowDeleteSuccessModal(false);
                    fetchregister(currentPage); 
                }}
                modalType={modalType}
            />

            {showModifyModal && (
                <Modal show={showModifyModal} handleClose={closeModifyModal}>
                    <ModifyModelPlanets
                        handleClose={closeModifyModal}
                        fetchregister={fetchregister}
                        currentPage={currentPage}
                        planet={PlanetToModify}
                        onSuccess={() => {
                            handleClose();
                            setShowDeleteSuccessModal(true);
                            fetchAllRegisters(); 
                        }}
                        modalType={modalType}
                    />
                </Modal>
            )}



            <ViewModal
                isOpen={showViewModal}
                onRequestClose={closeViewModal}
                planet={view}
            />
        </div>
    );
}

export default Planets;
