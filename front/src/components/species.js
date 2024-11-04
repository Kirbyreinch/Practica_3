import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/create_modal/modal';
import MyForm from '../Modals/create_modal/create_species';
import ConfirmDeleteModal from '../Modals/Delete_modals/delete_species';
import { Deletspecies } from '../request/species';
import DeleteComplete from '../Modals/message_modal/complete_message';
import Header from '../header/header';

function Species() {
    const [species, setSpecies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);

    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    const [specieToDelete, setSpecieToDelete] = useState(null);
    const [specieToModify, setSpecieToModify] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [view, setToView] = useState(null);
    const [filtered, setFiltered] = useState([]);
    const [allRegisters, setAllRegisters] = useState([]);
    const [modalType, setModalType] = useState(null); //    ESTADO PARA MENSAJES MODAL  //

    const limit = 10;
    const fetchregister = async (page) => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedEspecies = filtered.slice(startIndex, endIndex);
        setSpecies(paginatedEspecies);
        setTotalPages(Math.ceil(filtered.length / limit));
    };

    const fetchAllRegisters = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/Especies/modulo/todos`);
            setAllRegisters(response.data.especies);
            setFiltered(response.data.especies);
            setTotalPages(Math.ceil(response.data.total / limit));
            fetchregister(1);
        } catch (error) {
            console.error("Error al obtener todas las Especies:", error);
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
        closeViewModal()
    };

    // CERRAR TODAS LAS VENTANAS
    const handleClose = () => {
        fetchAllRegisters();
        setShowModal(false);
        setShowDeleteModal(false);
        setShowModifyModal(false);
        setShowViewModal(false);
        closeViewModal()
    };


    //VENTANA DE ELIMINAR
    const openDeleteModal = (specie) => {
        handleClose(); // Cerrar todos los modales
        setSpecieToDelete(specie);
        setShowDeleteModal(true);
    };
    //CERRAR VENTANA DE ELIMINAR
    const closeDeleteModal = () => {
        setSpecieToDelete(null);
        setShowDeleteModal(false);
    };


    //VENTANA DE MODIFICAR
    const openModifyModal = (specie) => {
        handleClose(); // Cerrar todos los modales
        setSpecieToModify(specie)
        setModalType('modify');;
        setShowModifyModal(true);
    };


    //CERRAR VENTANA DE MODIFICAR
    const closeModifyModal = () => {
        setSpecieToModify(null);
        setShowModifyModal(false);
    };


    const openViewModal = (specie) => {
        handleClose();
        setToView(specie);
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
            filteredResults = allRegisters.filter(specie =>
                specie.Nombre.toLowerCase().startsWith(trimmedText)
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
        if (specieToDelete) {
            try {
                await Deletspecies(specieToDelete._id);
                setModalType('delete');
                setShowDeleteSuccessModal(true);
                fetchAllRegisters();
            } catch (error) {
                console.error("Error al eliminar la Especie: ", error.message);
            } finally {
                closeDeleteModal();
            }
        }
    };



    return (
        <div className="contenedor">
            <Header onSearch={handleSearch} />
            <div className="Titulo">
                <h1>Especies</h1>
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
                {species.length === 0 ? (
                    <div className="no_registers">No hay ningun registro</div>
                ) : (
                    <div className="table-container"> 
                    <table className='Table'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Clasificación</th>
                                <th>Designación</th>
                                <th>Estatura</th>
                                <th>Color de Piel</th>
                                <th>Color de Cabello</th>
                                <th>Color de Ojos</th>
                                <th>Promedio de Vida</th>
                                <th>Lenguaje</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {species.map(specie => (
                                <tr key={specie._id}>
                                    <td>{GetHomologation(specie.Nombre)}</td>
                                    <td>{GetHomologation(specie.Clasificacion)}</td>
                                    <td>{GetHomologation(specie.Designacion)}</td>
                                    <td>{GetHomologation(specie.Estatura)}</td>
                                    <td>{GetHomologation(specie.Color_de_piel)}</td>
                                    <td>{GetHomologation(specie.Color_de_cabello)}</td>
                                    <td>{GetHomologation(specie.Color_de_ojos)}</td>
                                    <td>{GetHomologation(specie.Promedio_de_vida)}</td>
                                    <td>{GetHomologation(specie.Lenguaje)}</td>
                                    <td>
                                        <FontAwesomeIcon
                                            className="icon"
                                            icon={faTrash}
                                            onClick={() => openDeleteModal(specie)}
                                        />
                                        <FontAwesomeIcon
                                            className="icon"
                                            icon={faFilePen}
                                            onClick={() => openModifyModal(specie)}
                                        />
                                        <FontAwesomeIcon
                                            className="icon"
                                            icon={faEye}
                                            onClick={() => openViewModal(specie)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                )}
            </div>

            {/* PAGINACION */}
            <div className="Paginacion">
                <div className="pagination">
                    <br />
                    <button className="Btn_agregar" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                    <span> Página {currentPage} de {totalPages} </span>
                    <button className="Btn_agregar" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages || species.length === 0}>Siguiente</button>
                </div>
            </div>

            {/* MOSTRAR VENTANA ELIMNAR */}
            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onRequestClose={closeDeleteModal}
                onConfirm={handleDelete}
                Specie_Name={specieToDelete ? specieToDelete.Nombre : ''}
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
                        viewData={specieToModify}
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

export default Species;
