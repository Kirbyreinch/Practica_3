import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/create_modal/modal';
import MyForm from '../Modals/create_modal/create_starships';
import ConfirmDeleteModal from '../Modals/Delete_modals/delete_starships';
import ModifyModelStarships from '../Modals/modify_modals/modify_starships'
import { Deletestarships } from '../request/starships';
import RegisterComplete from '../Modals/message_modal/registro_modal';
import DeleteComplete from '../Modals/message_modal/delete_modal';
import ViewModal from '../Modals/view_modal/view_starships';
import Header from '../header/header';

function Starships() {
    const [starships, setStarships] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    const [starshipsToDelete, setstarshipsToDelete] = useState(null);
    const [starshipsToModify, setstarshipsToModify] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [view, setToView] = useState(null);
    const [filteredFilms, setFilteredFilms] = useState([]);


    //SE GUARDA LA RUTA PARA TOMAR LOS DATOS POR PAGINA //
    const fetchStarships = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/Naves/modulo/?page=${page}`);
            setStarships(response.data.naves);
            setFilteredFilms(response.data.naves);
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
        setShowViewModal(false);
    };


    //VENTANA DE ELIMINAR
    const openDeleteModal = (starship) => {
        handleClose(); // 
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
        handleClose(); 
        setstarshipsToModify(starship);
        setShowModifyModal(true);
    };


    //CERRAR VENTANA DE MODIFICAR
    const closeModifyModal = () => {
        setstarshipsToModify(null);
        setShowModifyModal(false);
    };



    const openViewModal = (starship) => {
        handleClose();
        setToView(starship);
        setShowViewModal(true);
    };

    const closeViewModal = () => {
        setToView(null);
        setShowViewModal(false);
    };




   // FUNCIONAMIENTO DE BUSQUEDA //
   const handleSearch = (text) => {
    const trimmedText = text.trim();

    if (trimmedText) {
        const filtered = starships.filter(starship => 
            starship.Nombre.toLowerCase().startsWith(trimmedText.toLowerCase())
        );
        setFilteredFilms(filtered);
    } else {
        setFilteredFilms(starships);
    }
};




// FUNCIONAMIENTO DE ELIMINAR //
    const handleDelete = async () => {
        if (starshipsToDelete) {
            try {
                await Deletestarships(starshipsToDelete._id);
                setShowDeleteSuccessModal(true);
            } catch (error) {
                console.error("Error al eliminar la Nave: ", error.message);
            } finally {
                closeDeleteModal();
                fetchStarships(currentPage);
            }
        }
    };






    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        fetchStarships(currentPage);
    };

    return (
        //HTML
        <div className="contenedor">
              <Header onSearch={handleSearch} /> 
            <div className="Titulo">
                <h1>Naves</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar' onClick={handleOpen}>+ Agregar Registro</button>
                <Modal show={showModal} handleClose={handleClose}>
                    <MyForm handleClose={handleClose}
                        fetchStarships={fetchStarships}
                        currentPage={currentPage}
                        onSuccess={() => {
                            handleClose();
                            setShowSuccessModal(true);
                        }} />
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
                        {filteredFilms.map(starship => (
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


            <DeleteComplete
                show={showDeleteSuccessModal}
                handleClose={() => {
                    setShowDeleteSuccessModal(false);
                    fetchStarships(currentPage);
                }}
            />


            {/* MOSTRAR VENTANA MODIFICAR */}
            {showModifyModal && (
                <Modal show={showModifyModal} handleClose={closeModifyModal}>
                    <ModifyModelStarships
                        handleClose={closeModifyModal}
                        fetchStarships={fetchStarships}
                        currentPage={currentPage}
                        starship={starshipsToModify}
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
                starship={view}
            />

        </div>
    );
}

export default Starships;



