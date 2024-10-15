import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/create_modal/modal';
import MyForm from '../Modals/create_modal/create_film';
import ConfirmDeleteModal from '../Modals/Delete_modals/delete_films';
import ModifyFilmForm from '../Modals/modify_modals/modify_films'
import { deleteMovie } from '../request/films';

function Films() {
    const [films, setFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [filmToDelete, setFilmToDelete] = useState(null);
    const [filmToModify, setFilmToModify] = useState(null);

    // Función para abrir el modal de agregar
    const handleOpen = () => {
        setShowDeleteModal(false);
        setShowModifyModal(false); // Cerrar modal de modificación
        setShowModal(true);
    };

    // Función para cerrar todos los modales
    const handleClose = () => {
        setShowModal(false);
        setShowDeleteModal(false);
        setShowModifyModal(false);
    };

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

    const openDeleteModal = (film) => {
        handleClose(); // Cerrar todos los modales
        setFilmToDelete(film);
        setShowDeleteModal(true);
    };

    const openModifyModal = (film) => {
        handleClose(); // Cerrar todos los modales
        setFilmToModify(film);
        setShowModifyModal(true);
    };

    const closeDeleteModal = () => {
        setFilmToDelete(null);
        setShowDeleteModal(false);
    };

    const closeModifyModal = () => {
        setFilmToModify(null);
        setShowModifyModal(false);
    };

    const handleDelete = async () => {
        if (filmToDelete) {
            try {
                await deleteMovie(filmToDelete._id);
                fetchFilms(currentPage);
            } catch (error) {
                console.error("Error al eliminar la película: ", error.message);
            } finally {
                closeDeleteModal();
            }
        }
    };

    return (
        <div className="contenedor">
            <div className="Titulo">
                <h1>Peliculas</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar' onClick={handleOpen}>+ Agregar Registro</button>
                <Modal show={showModal} handleClose={handleClose}>
                    <MyForm handleClose={handleClose} fetchFilms={fetchFilms} currentPage={currentPage} />
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="Paginacion">
                <div className="pagination">
                    <br />
                    <button className="button-74" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                    <span> Página {currentPage} de {totalPages} </span>
                    <button className="button-74" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
                </div>
            </div>

            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onRequestClose={closeDeleteModal}
                onConfirm={handleDelete}
                filmTitle={filmToDelete ? filmToDelete.Titulo : ''}
            />

            {showModifyModal && (
                <Modal show={showModifyModal} handleClose={closeModifyModal}>
                    <ModifyFilmForm
                        handleClose={closeModifyModal}
                        fetchFilms={fetchFilms}
                        currentPage={currentPage}
                        film={filmToModify}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Films;



