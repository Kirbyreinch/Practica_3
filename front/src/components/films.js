import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/create_modal/modal';
import MyForm from '../Modals/create_modal/create_film';
import ConfirmDeleteModal from '../Modals/Delete_modals/delete_films';
import ModifyFilmForm from '../Modals/modify_modals/modify_films';
import RegisterComplete from '../Modals/message_modal/registro_modal';
import DeleteComplete from '../Modals/message_modal/delete_modal';
import { deleteMovie } from '../request/films';
import ViewModal from '../Modals/view_modal/view_film';



function Films() {
    const [films, setFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    const [filmToDelete, setFilmToDelete] = useState(null);
    const [filmToModify, setFilmToModify] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [view, setToView] = useState(null);

    const fetchFilms = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/Peliculas/modulo/?page=${page}`);
            setFilms(response.data.pelis);
            setTotalPages(Math.ceil(response.data.total / 10));
        } catch (error) {
            console.error("Error al obtener las películas:", error);
        }
    };

    useEffect(() => {
        fetchFilms(currentPage);
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
        setShowViewModal(false);
    };

    //VENTANA DE ELIMINAR
    const openDeleteModal = (film) => {
        handleClose();
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
        setShowModifyModal(true);
    };
    //SELECCIONAR ELIMINAR
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

    const handleDelete = async () => {
        if (filmToDelete) {
            try {
                await deleteMovie(filmToDelete._id);
                setShowDeleteSuccessModal(true);
            } catch (error) {
                console.error("Error al eliminar la película: ", error.message);
            } finally {
                closeDeleteModal();
                fetchFilms(currentPage);
            }
        }
    };


    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        fetchFilms(currentPage);
    };



    return (
        <div className="contenedor">
            <div className="Titulo">
                <h1>Peliculas</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar' onClick={handleOpen}>+ Agregar Registro</button>
                <Modal show={showModal} handleClose={handleClose}>
                    <MyForm
                        handleClose={handleClose}
                        fetchFilms={fetchFilms}
                        currentPage={currentPage}
                        onSuccess={() => {
                            handleClose();
                            setShowSuccessModal(true);
                        }}
                    />
                </Modal>
            </div>
            <div className="DatosBD">
                <table className='Table'>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Director</th>
                            <th>Productor</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {films.map(film => (
                            <tr key={film._id}>
                                <td>{film.Titulo}</td>
                                <td>{film.Director}</td>
                                <td>{film.Productor}</td>
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
                Film_Title={filmToDelete ? filmToDelete.Titulo : ''}

            />

            <DeleteComplete
                show={showDeleteSuccessModal}
                handleClose={() => {
                    setShowDeleteSuccessModal(false);
                    fetchFilms(currentPage);
                }}
            />

            {showModifyModal && (
                <Modal show={showModifyModal} handleClose={closeModifyModal}>
                    <ModifyFilmForm
                        handleClose={closeModifyModal}
                        fetchFilms={fetchFilms}
                        currentPage={currentPage}
                        film={filmToModify}
                        onSuccess={() => {
                            handleClose();
                            setShowSuccessModal(true);
                        }}
                    />
                </Modal>
            )}

            {/* MODAL DE REGISTRO EXITOSO */}
            <RegisterComplete show={showSuccessModal} handleClose={handleSuccessModalClose} />


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
