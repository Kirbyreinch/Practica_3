import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/create_modal/modal';
import MyForm from '../Modals/create_modal/create_characters';
import ConfirmDeleteModal from '../Modals/Delete_modals/delete_characters';
import ModifyModelCharacter from '../Modals/modify_modals/modify_characters'
import { Deletecharacter } from '../request/characters';

function Characters() {
    const [characters, setCharacter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [CharacterToDelete, setCharacterToDelete] = useState(null);
    const [CharacterToModify, setCharacterToModify] = useState(null);



    //SE GUARDA LA RUTA PARA TOMAR LOS DATOS POR PAGINA //
    const fetchCharacter = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/Personajes/modulo/?page=${page}`);
            setCharacter(response.data.personajes);
            setTotalPages(Math.ceil(response.data.total / 10));
        } catch (error) {
            console.error("Error al obtener las películas:", error);
        }
    };

    useEffect(() => {
        fetchCharacter(currentPage);
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
    const openDeleteModal = (character) => {
        handleClose(); // Cerrar todos los modales
        setCharacterToDelete(character);
        setShowDeleteModal(true);
    };
    //CERRAR VENTANA DE ELIMINAR
    const closeDeleteModal = () => {
        setCharacterToDelete(null);
        setShowDeleteModal(false);
    };


    //VENTANA DE MODIFICAR
    const openModifyModal = (character) => {
        handleClose(); // Cerrar todos los modales
        setCharacterToModify(character);
        setShowModifyModal(true);
    };


    //CERRAR VENTANA DE MODIFICAR
    const closeModifyModal = () => {
        setCharacterToModify(null);
        setShowModifyModal(false);
    };


    //SELECCIONAR ELIMINAR
    const handleDelete = async () => {
        if (CharacterToDelete) {
            try {
                await Deletecharacter(CharacterToDelete._id);
                fetchCharacter(currentPage);
            } catch (error) {
                console.error("Error al eliminar el Personaje: ", error.message);
            } finally {
                closeDeleteModal();
            }
        }
    };


    return (
        //HTML
        <div className="contenedor">
            <div className="Titulo">
                <h1>Personajes</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar' onClick={handleOpen}>+ Agregar Registro</button>
                <Modal show={showModal} handleClose={handleClose}>
                    <MyForm handleClose={handleClose} fetchCharacter={fetchCharacter} currentPage={currentPage} />
                </Modal>
            </div>
            <div className="DatosBD">
                <table className='Table'>
                    <thead>
                        <tr>
                        <th>Nombre</th>
                            <th>Altura</th>
                            <th>Peso</th>
                            <th>Color de cabello</th>
                            <th>Color de piel</th>
                            <th>Color de ojos</th>
                            <th>Fecha de nacimiento</th>
                            <th>Género</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {characters.map(character => (
                            <tr key={character._id}>
                                <td>{character.Nombre}</td>
                                <td>{character.Altura}</td>
                                <td>{character.Masa}</td>
                                <td>{character.Color_Cabello}</td>
                                <td>{character.Color_de_Piel}</td>
                                <td>{character.Color_Ojos}</td>
                                <td>{character.Fecha_Nacimiento}</td>
                                <td>{character.Genero}</td>
                                <td>
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faTrash}
                                        onClick={() => openDeleteModal(character)}
                                    />
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faFilePen}
                                        onClick={() => openModifyModal(character)}
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
                Character_Name={CharacterToDelete ? CharacterToDelete.Nombre : ''}
            />

            {/* MOSTRAR VENTANA MODIFICAR */}
            {showModifyModal && (
                <Modal show={showModifyModal} handleClose={closeModifyModal}>
                    <ModifyModelCharacter
                        handleClose={closeModifyModal}
                        fetchCharacter={fetchCharacter}
                        currentPage={currentPage}
                        character={CharacterToModify}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Characters;



