
import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/create_modal/modal';
import MyForm from '../Modals/create_modal/create_film';
import ConfirmDeleteModal from '../Modals/Delete_modals/delete_films';
import ModifyFilmForm from '../Modals/modify_modals/modify_films';
import DeleteComplete from '../Modals/message_modal/delete_modal';
import { deleteMovie } from '../request/films';
import ViewModal from '../Modals/view_modal/view_film';
import Header from '../header/header';


function Films() {
    const [films, setFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    const [filmToDelete, setFilmToDelete] = useState(null);
    const [filmToModify, setFilmToModify] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [view, setToView] = useState(null);
    const [filtered, setFiltered] = useState([]);
    const [allRegisters, setAllRegisters] = useState([]);
    const [modalType, setModalType] = useState(null); //    ESTADO PARA MENSAJES MODAL  //


    const limit = 10;
    const fetchregister = async (page) => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedFilms = filtered.slice(startIndex, endIndex);
        setFilms(paginatedFilms);
        setTotalPages(Math.ceil(filtered.length / limit));
    };

    const fetchAllRegisters = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/Peliculas/modulo/todos`);
            setAllRegisters(response.data.pelis);
            setFiltered(response.data.pelis);
            setTotalPages(Math.ceil(response.data.total / limit));
            fetchregister(1);
        } catch (error) {
            console.error("Error al obtener todas las Peliculas:", error);
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
    };

    // CERRAR TODAS LAS VENTANAS
    const handleClose = () => {
        setShowModal(false);
        fetchAllRegisters();
        setShowDeleteModal(false);
        setShowModifyModal(false);
        setShowViewModal(false);
    };


    //VENTANA DE ELIMINAR
    const openDeleteModal = (film) => {
        handleClose(); // Cerrar todos los modales
        setFilmToDelete(film);
        setShowDeleteModal(true);
    };
    //CERRAR VENTANA DE ELIMINAR
    const closeDeleteModal = () => {
        setFilmToDelete(null);
        setShowDeleteModal(false);
    };


    //VENTANA DE MODIFICAR
    const openModifyModal = (film) => {
        handleClose();
        setFilmToModify(film);
        setModalType('modify');
        setShowModifyModal(true);
    };


    //CERRAR VENTANA DE MODIFICAR
    const closeModifyModal = () => {
        setFilmToModify(null);
        setShowModifyModal(false);
    };


    const openViewModal = (film) => {
        handleClose();
        setToView(film);
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
            filteredResults = allRegisters.filter(films =>
                films.Titulo.toLowerCase().startsWith(trimmedText)
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
        if (filmToDelete) {
            try {
                await deleteMovie(filmToDelete._id);
                setModalType('delete');
                setShowDeleteSuccessModal(true);
                fetchAllRegisters();
            } catch (error) {
                console.error("Error al eliminar la Pelicula: ", error.message);
            } finally {
                closeDeleteModal();
            }
        }
    };



    return (
        <div className="contenedor">
            <Header onSearch={handleSearch} />
            <div className="Titulo">
                <h1>Peliculas</h1>
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
                            <th>Título</th>
                            <th>Director</th>
                            <th>Productor</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {films.map(film => (
                            <tr key={GetHomologation(film._id)}>
                                <td>{GetHomologation(film.Titulo)}</td>
                                <td>{GetHomologation(film.Director)}</td>
                                <td>{GetHomologation(film.Productor)}</td>
                                <td>
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faTrash}
                                        onClick={() => openDeleteModal(film)}
                                    />
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faFilePen}
                                        onClick={() => openModifyModal(film)}
                                    />
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faEye}
                                        onClick={() => openViewModal(film)}
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
                Film_Title={filmToDelete ? filmToDelete.Titulo : ''}
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
                    <ModifyFilmForm
                        handleClose={closeModifyModal}
                        fetchregister={fetchregister}
                        currentPage={currentPage}
                        film={filmToModify}
                        onSuccess={() => {
                            handleClose();
                            setShowDeleteSuccessModal(true);
                            fetchAllRegisters(); 
                        }}
                        modalType={modalType}
                    />
                </Modal>
            )}



            {/* MODAL   VER */}
            <ViewModal
                isOpen={showViewModal}
                onRequestClose={closeViewModal}
                film={view}
            />
        </div>
    );
}

export default Films;
