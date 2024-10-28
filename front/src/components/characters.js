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
    const [filtered, setFiltered] = useState([]);
    const [allRegisters, setAllRegisters] = useState([]);    

    const fetchregister = async (page) => {
        const limit = 10; 
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedCharacters = filtered.slice(startIndex, endIndex);

        setCharacter(paginatedCharacters);
        setTotalPages(Math.ceil(filtered.length / limit));
    };

    const fetchAllRegisters = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/Personajes/modulo/todos`);
            setAllRegisters(response.data.personajes);
            setFiltered(response.data.personajes); 
            setTotalPages(Math.ceil(response.data.total / 10));
            fetchregister(1); 
        } catch (error) {
            console.error("Error al obtener todos los personajes:", error);
        }
    };

    useEffect(() => {
        fetchAllRegisters(); 
    }, []);

    useEffect(() => {
        fetchregister(currentPage); 
    }, );

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

    const handleSearch = (text) => {
        const trimmedText = text.trim().toLowerCase();

        if (trimmedText) {
            const filteredResults = allRegisters.filter(character =>
                character.Nombre.toLowerCase().startsWith(trimmedText)
            );
            setFiltered(filteredResults);
            setCurrentPage(1); 
        } else {
            setFiltered(allRegisters); 
            setCurrentPage(1);
        }
    };

    const GetHomologation = (value) => {
        if (value === "unknown" || value === "N/A" || value === "n/a" || value === "none" || value === "") {
            return "-----";
        }
        return value || "-----";
    };

    const handleDelete = async () => {
        if (CharacterToDelete) {
            try {
                await Deletecharacter(CharacterToDelete._id);
                setShowDeleteSuccessModal(true);
                fetchAllRegisters(); 
            } catch (error) {
                console.error("Error al eliminar el Personaje: ", error.message);
            } finally {
                closeDeleteModal();
            }
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        fetchregister(currentPage);
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
                    <MyForm handleClose={handleClose} fetchCharacter={fetchregister} currentPage={currentPage}
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
                            <th>Color de Cabello</th>
                            <th>Color de Piel</th>
                            <th>Color de Ojos</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Género</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {characters.map(character => (
                            <tr key={character._id}>
                                <td>{GetHomologation(character.Nombre)}</td>
                                <td>{GetHomologation(character.Altura)}</td>
                                <td>{GetHomologation(character.Masa)}</td>
                                <td>{GetHomologation(character.Color_Cabello)}</td>
                                <td>{GetHomologation(character.Color_de_Piel)}</td>
                                <td>{GetHomologation(character.Color_Ojos)}</td>
                                <td>{GetHomologation(character.Fecha_Nacimiento)}</td>
                                <td>{GetHomologation(character.Genero)}</td>
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
                    fetchregister(currentPage); 
                }}
            />

            {showModifyModal && (
                <Modal show={showModifyModal} handleClose={closeModifyModal}>
                    <ModifyModelCharacter
                        handleClose={closeModifyModal}
                        fetchCharacter={fetchregister}
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
