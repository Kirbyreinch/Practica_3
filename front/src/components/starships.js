import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/create_modal/modal';
import MyForm from '../Modals/create_modal/create_starships';
import ConfirmDeleteModal from '../Modals/Delete_modals/delete_starships';
import ModifyModelStarships from '../Modals/modify_modals/modify_starships'
import { Deletestarships } from '../request/starships';

function Starships() {
    const [starships, setStarships] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [starshipsToDelete, setstarshipsToDelete] = useState(null);
    const [starshipsToModify, setstarshipsToModify] = useState(null);



    //SE GUARDA LA RUTA PARA TOMAR LOS DATOS POR PAGINA //
    const fetchStarships = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/Naves/modulo/?page=${page}`);
            setStarships(response.data.naves);
            setTotalPages(Math.ceil(response.data.total / 10));
        } catch (error) {
            console.error("Error al obtener las Naves:", error);
        }
    };

    useEffect(() => {
        fetchStarships(currentPage);
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
    const openDeleteModal = (starship) => {
        handleClose(); // Cerrar todos los modales
        setstarshipsToDelete(starship);
        setShowDeleteModal(true);
    };
    //CERRAR VENTANA DE ELIMINAR
    const closeDeleteModal = () => {
        setstarshipsToDelete(null);
        setShowDeleteModal(false);
    };


    //VENTANA DE MODIFICAR
    const openModifyModal = (starship) => {
        handleClose(); // Cerrar todos los modales
        setstarshipsToModify(starship);
        setShowModifyModal(true);
    };


    //CERRAR VENTANA DE MODIFICAR
    const closeModifyModal = () => {
        setstarshipsToModify(null);
        setShowModifyModal(false);
    };


    //SELECCIONAR ELIMINAR
    const handleDelete = async () => {
        if (starshipsToDelete) {
            try {
                await Deletestarships(starshipsToDelete._id);
                fetchStarships(currentPage);
            } catch (error) {
                console.error("Error al eliminar la Nave: ", error.message);
            } finally {
                closeDeleteModal();
            }
        }
    };


    return (
        //HTML
        <div className="contenedor">
            <div className="Titulo">
                <h1>Naves</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar' onClick={handleOpen}>+ Agregar Registro</button>
                <Modal show={showModal} handleClose={handleClose}>
                    <MyForm handleClose={handleClose} fetchFilms={fetchStarships} currentPage={currentPage} />
                </Modal>
            </div>
            <div className="DatosBD">
                <table className='Table'>
                    <thead>
                        <tr>
                        <th>Nombre</th>
                            <th>Modelo</th>
                            <th>Clase</th>
                            <th>Tamaño</th>
                            <th>Numero de pasajeros</th>
                            <th>Maxima velocidad atmosferica</th>
                            <th>Hiperimpulsor</th>
                            <th>MGLT</th>
                            <th>Capacidad de carga</th>
                            <th>Tiempo maximo de combustible</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {starships.map(starship => (
                            <tr key={starship._id}>
                                <td>{starship.Nombre}</td>
                                <td>{starship.Modelo}</td>
                                <td>{starship.Clase}</td>
                                <td>{starship.Tamaño}</td>
                                <td>{starship.Numero_de_Pasajeros}</td>
                                <td>{starship.Maxima_velocidad_atmosferica}</td>
                                <td>{starship.Hiperimpulsor}</td>
                                <td>{starship.MGLT}</td>
                                <td>{starship.Capacidad_de_carga}</td>
                                <td>{starship.Tiempo_Maximo_Cobustibles}</td>
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
                Starship_Name={starshipsToDelete ? starshipsToDelete.Nombre : ''}
            />

            {/* MOSTRAR VENTANA MODIFICAR */}
            {showModifyModal && (
                <Modal show={showModifyModal} handleClose={closeModifyModal}>
                    <ModifyModelStarships
                        handleClose={closeModifyModal}
                        fetchStarships={fetchStarships}
                        currentPage={currentPage}
                        Starship={starshipsToModify}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Starships;



