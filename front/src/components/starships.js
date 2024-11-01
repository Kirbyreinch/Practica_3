
import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/create_modal/modal';
import MyForm from '../Modals/create_modal/create_starships';
import ConfirmDeleteModal from '../Modals/Delete_modals/delete_starships';
import { Deletestarships } from '../request/starships';
import DeleteComplete from '../Modals/message_modal/complete_message';
import Header from '../header/header';

function Starships() {
    const [starships, setStarships] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    const [starshipsToDelete, setstarshipsToDelete] = useState(null);
    const [starshipsToModify, setstarshipsToModify] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [view, setToView] = useState(null);
    const [filtered, setFiltered] = useState([]);
    const [allRegisters, setAllRegisters] = useState([]);
    const [modalType, setModalType] = useState(null); //    ESTADO PARA MENSAJES MODAL  //

    const limit = 10;
    const fetchregister = async (page) => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedStarships = filtered.slice(startIndex, endIndex);
        setStarships(paginatedStarships);
        setTotalPages(Math.ceil(filtered.length / limit));
    };

    const fetchAllRegisters = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/Naves/modulo/todos`);
            setAllRegisters(response.data.naves);
            setFiltered(response.data.naves);
            setTotalPages(Math.ceil(response.data.total / limit));
            fetchregister(1);
        } catch (error) {
            console.error("Error al obtener todas las Naves:", error);
        }
    };

    useEffect(() => {
        fetchAllRegisters();
    }, []);

    useEffect(() => {
        fetchregister(currentPage);
    },);




    // VENTANA DE REGITRAR
    const handleOpen = () => {
        setShowDeleteModal(false);
        setShowModifyModal(false);
        setShowModal(true);
        closeViewModal();
    };

    // CERRAR TODAS LAS VENTANAS
    const handleClose = () => {
        fetchAllRegisters();
        setShowModal(false);
        setShowDeleteModal(false);
        setShowModifyModal(false);
        setShowViewModal(false);
        closeViewModal();
    };


    //VENTANA DE ELIMINAR
    const openDeleteModal = (nave) => {
        handleClose(); // Cerrar todos los modales
        setstarshipsToDelete(nave);
        setShowDeleteModal(true);
    };
    //CERRAR VENTANA DE ELIMINAR
    const closeDeleteModal = () => {
        setstarshipsToDelete(null);
        setShowDeleteModal(false);
    };


    //VENTANA DE MODIFICAR
    const openModifyModal = (nave) => {
        handleClose();
        setstarshipsToModify(nave);
        setModalType('modify');
        setShowModifyModal(true);
    };


    //CERRAR VENTANA DE MODIFICAR
    const closeModifyModal = () => {
        setstarshipsToModify(null);
        setShowModifyModal(false);
    };


    const openViewModal = (nave) => {
        handleClose();
        setToView(nave);
        setShowViewModal(true);
    };

    const closeViewModal = () => {
        setToView(null);
        setShowViewModal(false);
    };



    // FUNCIONAMIENTO DE BUSQUEDA //
    const handleSearch = (text) => {
        const trimmedText = text.trim().toLowerCase();
        let filteredResults = allRegisters;

        if (trimmedText) {
            filteredResults = allRegisters.filter(nave =>
                nave.Nombre.toLowerCase().startsWith(trimmedText)
            );
        }

        setFiltered(filteredResults);
        setCurrentPage(1);
    };

    //HOMOLOGACIÓN
    const GetHomologation = (value) => {
        if (value === "unknown" || value === "N/A" || value === "n/a" || value === "none" || value === "") {
            return "-----";
        }
        return value || "-----";
    };


    // FUNCIONAMIENTO DE ELIMINAR //
    const handleDelete = async () => {
        if (starshipsToDelete) {
            try {
                await Deletestarships(starshipsToDelete._id);
                setModalType('delete');
                setShowDeleteSuccessModal(true);
                fetchAllRegisters();
            } catch (error) {
                console.error("Error al eliminar la nave: ", error.message);
            } finally {
                closeDeleteModal();
            }
        }
    };



    return (
        <div className="contenedor">
            <Header onSearch={handleSearch} />
            <div className="Titulo">
                <h1>Naves</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar' onClick={handleOpen}>+ Agregar Registro</button>
                <Modal show={showModal} handleClose={handleClose}>
                    <MyForm handleClose={handleClose} fetchCharacter={fetchregister} currentPage={currentPage}

                        onSuccess={() => {
                            handleClose();

                        }}
                        setShowDeleteSuccessModal={setShowDeleteSuccessModal}
                        setModalType={setModalType}
                    />
                </Modal>
            </div>
            <div className="DatosBD">
                {starships.length === 0 ? (
                    <div className="no_registers">No hay ningun registro</div>
                ) : (
                    <table className='Table'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Modelo</th>
                                <th>Clase</th>
                                <th>Tamaño</th>
                                <th>Número de Pasajeros</th>
                                <th>Máxima Velocidad Atmosférica</th>
                                <th>Hiperimpulsor</th>
                                <th>MGLT</th>
                                <th>Capacidad de Carga</th>
                                <th>Tiempo Máximo de Combustible</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {starships.map(starship => (
                                <tr key={starship._id}>
                                    <td>{GetHomologation(starship.Nombre)}</td>
                                    <td>{GetHomologation(starship.Modelo)}</td>
                                    <td>{GetHomologation(starship.Clase)}</td>
                                    <td>{GetHomologation(starship.Tamaño)}</td>
                                    <td>{GetHomologation(starship.Numero_de_Pasajeros)}</td>
                                    <td>{GetHomologation(starship.Maxima_velocidad_atmosferica)}</td>
                                    <td>{GetHomologation(starship.Hiperimpulsor)}</td>
                                    <td>{GetHomologation(starship.MGLT)}</td>
                                    <td>{GetHomologation(starship.Capacidad_de_carga)}</td>
                                    <td>{GetHomologation(starship.Tiempo_Maximo_Cobustibles)}</td>
                                    <td>
                                        <FontAwesomeIcon
                                            className="icon"
                                            icon={faTrash}
                                            onClick={() => openDeleteModal(starship)}
                                        />
                                        <FontAwesomeIcon
                                            className="icon"
                                            icon={faFilePen}
                                            onClick={() => openModifyModal(starship)}
                                        />
                                        <FontAwesomeIcon
                                            className="icon"
                                            icon={faEye}
                                            onClick={() => openViewModal(starship)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* PAGINACION */}
            <div className="Paginacion">
                <div className="pagination">
                    <br />
                    <button className="Btn_agregar" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1 || starships.length === 0}>Anterior</button>
                    <span> Página {currentPage} de {totalPages} </span>
                    <button className="Btn_agregar" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages || starships.length === 0}>Siguiente</button>
                </div>
            </div>

            {/* MOSTRAR VENTANA ELIMNAR */}
            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onRequestClose={closeDeleteModal}
                onConfirm={handleDelete}
                Specie_Name={starshipsToDelete ? starshipsToDelete.Nombre : ''}
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

            {/* MOSTRAR VENTANA MODIFICAR */}
            {showModifyModal && (
                <Modal show={showModifyModal} handleClose={closeModifyModal}>
                    <MyForm
                        handleClose={() => {
                            closeModifyModal();
                            fetchAllRegisters();
                        }}
                        fetchAllRegisters={fetchAllRegisters}
                        viewData={starshipsToModify}
                        isModifyMode={true}
                        setShowDeleteSuccessModal={setShowDeleteSuccessModal}
                        setModalType={setModalType}
                        onSuccess={() => {
                            setShowDeleteSuccessModal(true);
                            fetchAllRegisters();
                        }}
                    />
                </Modal>
            )}



            {/* MODAL   VER */}
            {showViewModal && (
                <Modal show={showViewModal} handleClose={closeViewModal}>
                    <MyForm
                        handleClose={closeViewModal}
                        viewData={view}
                        isViewMode={true}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Starships;
