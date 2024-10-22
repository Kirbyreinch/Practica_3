import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/create_modal/modal';
import MyForm from '../Modals/create_modal/create_characters';
import ConfirmDeleteModal from '../Modals/Delete_modals/delete_characters';
import ModifyModelCharacter from '../Modals/modify_modals/modify_characters';
import { Deletecharacter } from '../request/characters';
import RegisterComplete from '../Modals/message_modal/registro_modal';
import DeleteComplete from '../Modals/message_modal/delete_modal';
import ViewModal from '../Modals/view_modal/view_character';
import Header from '../header/header';


function Characters() {
    const [characters, setCharacter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    const [CharacterToDelete, setCharacterToDelete] = useState(null);
    const [CharacterToModify, setCharacterToModify] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [view, setToView] = useState(null);
    const [filteredFilms, setFilteredFilms] = useState([]);

    const fetchCharacter = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/Personajes/modulo/?page=${page}`);
            setCharacter(response.data.personajes);
            setFilteredFilms(response.data.personajes);
            setTotalPages(Math.ceil(response.data.total / 10));
        } catch (error) {
            console.error("Error al obtener los personajes:", error);
        }
    };

    useEffect(() => {
        fetchCharacter(currentPage);
    }, [currentPage]);

    const handleOpen = () => {
        setShowDeleteModal(false);
        setShowModifyModal(false);
        setShowModal(true);

    };

    const handleClose = () => {
        setShowModal(false);
        setShowDeleteModal(false);
        setShowModifyModal(false);
        setShowViewModal(false);
    };

    const openDeleteModal = (character) => {
        handleClose();
        setCharacterToDelete(character);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setCharacterToDelete(null);
        setShowDeleteModal(false);
    };

    const openModifyModal = (character) => {
        handleClose();
        setCharacterToModify(character);
        setShowModifyModal(true);
    };

    const closeModifyModal = () => {
        setCharacterToModify(null);
        setShowModifyModal(false);
    };

    const openViewModal = (character) => {
        handleClose();
        setToView(character);
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
        const filtered = characters.filter(character => 
            character.Nombre.toLowerCase().startsWith(trimmedText.toLowerCase())
        );
        setFilteredFilms(filtered);
    } else {
        setFilteredFilms(characters);
    }
};




// FUNCIONAMIENTO DE ELIMINAR //
    const handleDelete = async () => {
        if (CharacterToDelete) {
            try {
                await Deletecharacter(CharacterToDelete._id);
                setShowDeleteSuccessModal(true);
            } catch (error) {
                console.error("Error al eliminar el Personaje: ", error.message);
            } finally {
                closeDeleteModal();
                fetchCharacter(currentPage);
            }
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        fetchCharacter(currentPage);
    };

    return (
        <div className="contenedor">
              <Header onSearch={handleSearch} /> 
            <div className="Titulo">
                <h1>Personajes</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar' onClick={handleOpen}>+ Agregar Registro</button>
                <Modal show={showModal} handleClose={handleClose} >
                    <MyForm handleClose={handleClose} fetchCharacter={fetchCharacter} currentPage={currentPage}
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
                        {filteredFilms.map(character => (
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
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faEye}
                                        onClick={() => openViewModal(character)}
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
                Character_Name={CharacterToDelete ? CharacterToDelete.Nombre : ''}
            />

            <DeleteComplete
                show={showDeleteSuccessModal}
                handleClose={() => {
                    setShowDeleteSuccessModal(false);
                    fetchCharacter(currentPage);
                }}
            />

            {showModifyModal && (
                <Modal show={showModifyModal} handleClose={closeModifyModal}>
                    <ModifyModelCharacter
                        handleClose={closeModifyModal}
                        fetchCharacter={fetchCharacter}
                        currentPage={currentPage}
                        character={CharacterToModify}
                        onSuccess={() => {
                            handleClose();
                            setShowSuccessModal(true);
                        }}
                    />
                </Modal>
            )}

            <RegisterComplete show={showSuccessModal} handleClose={handleSuccessModalClose} />

            {/* MODAL   VER */}
            <ViewModal
                isOpen={showViewModal}
                onRequestClose={closeViewModal}
                character={view}
            />
        </div>
    );
}

export default Characters;
