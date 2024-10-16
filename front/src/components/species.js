import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/create_modal/modal';
import MyForm from '../Modals/create_modal/create_species';
import ConfirmDeleteModal from '../Modals/Delete_modals/delete_species';
import ModifyModelSpecies from '../Modals/modify_modals/modify_species'
import { Deletspecies } from '../request/species';

function Species() {
    const [species, setSpecies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [specieToDelete, setSpecieToDelete] = useState(null);
    const [specieToModify, setSpecieToModify] = useState(null);



    //SE GUARDA LA RUTA PARA TOMAR LOS DATOS POR PAGINA //
    const fetchSpecies = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/Especies/modulo/?page=${page}`);
            setSpecies(response.data.especies);
            setTotalPages(Math.ceil(response.data.total / 10));
        } catch (error) {
            console.error("Error al obtener las Especies:", error);
        }
    };

    useEffect(() => {
        fetchSpecies(currentPage);
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
        setSpecieToModify(specie);
        setShowModifyModal(true);
    };


    //CERRAR VENTANA DE MODIFICAR
    const closeModifyModal = () => {
        setSpecieToModify(null);
        setShowModifyModal(false);
    };


    //SELECCIONAR ELIMINAR
    const handleDelete = async () => {
        if (specieToDelete) {
            try {
                await Deletspecies(specieToDelete._id);
                fetchSpecies(currentPage);
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
                <h1>Especies</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar' onClick={handleOpen}>+ Agregar Registro</button>
                <Modal show={showModal} handleClose={handleClose}>
                    <MyForm handleClose={handleClose} fetchFilms={fetchSpecies} currentPage={currentPage} />
                </Modal>
            </div>
            <div className="DatosBD">
                <table className='Table'>
                    <thead>
                        <tr>
                        <th>Nombre</th>
                            <th>Clasificación</th>
                            <th>Designación</th>
                            <th>Estatura</th>
                            <th>Color de piel</th>
                            <th>Color de ojos</th>
                            <th>Fecha de ojos</th>
                            <th>Promedio de vida</th>
                            <th>Lenguaje</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {species.map(specie => (
                            <tr key={specie._id}>
                                <td>{specie.Nombre}</td>
                                <td>{specie.Clasificacion}</td>
                                <td>{specie.Designacion}</td>
                                <td>{specie.Estatura}</td>
                                <td>{specie.Color_de_piel}</td>
                                <td>{specie.Color_de_cabello}</td>
                                <td>{specie.Color_de_ojos}</td>
                                <td>{specie.Promedio_de_vida}</td>
                                <td>{specie.Lenguaje}</td>
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
                Specie_Name={specieToDelete ? specieToDelete.Nombre : ''}
            />

            {/* MOSTRAR VENTANA MODIFICAR */}
            {showModifyModal && (
                <Modal show={showModifyModal} handleClose={closeModifyModal}>
                    <ModifyModelSpecies
                        handleClose={closeModifyModal}
                        fetchSpecies={fetchSpecies}
                        currentPage={currentPage}
                        Specie={specieToModify}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Species;



