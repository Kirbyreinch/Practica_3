// //      COMPONENTE NO FUNCIONAL USADO PARA FINES EXPERIMENTALES     //



// Visual:
// - En el modal de agregar o editar algún registro, el contenedor del formulario es más grande en la mayoría de los módulos, en el caso de las películas es más pequeño y hay espacio que no se usa del modal.
// - Para ver detalle de cualquier registro puede usarse el mismo modal para agregar o editar el registro, solo deshabilitando los campos.


// Código en front:



// - Los modales "delete_modal.js" y "register_modal.js" pueden combinarse para usar el mismo modal solo enviando el mensaje a mostrar.







// - Los modales para crear y modificar registros, se puede utilizar una de ellas parametrizando el componente para saber si se puede editar o no. También se puede usar un solo modal para ver el detalle de cada registro.
// - En los personajes no guarda películas, especies, naves espaciales y vehículos.

// Código back:
// - En los personajes no guarda películas, especies, naves espaciales y vehículos.










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

function Planets() {
    const [planets, setPlanets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    const [planetToDelete, setPlanetToDelete] = useState(null);
    const [PlanetToModify, setPlanetToModify] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [view, setToView] = useState(null);
    const [filtered, setFiltered] = useState([]);
    const [allRegisters, setAllRegisters] = useState([]);    


    const fetchregister = async (page) => {
        const limit = 10; 
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedCharacters = filtered.slice(startIndex, endIndex);

        setPlanets(paginatedCharacters);
        setTotalPages(Math.ceil(filtered.length / limit));
    };

    const fetchAllRegisters = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/Planetas/modulo/todos`);
            setAllRegisters(response.data.planets);
            setFiltered(response.data.planets); 
            setTotalPages(Math.ceil(response.data.total / 10));
            fetchregister(1); 
        } catch (error) {
            console.error("Error al obtener todos los planets:", error);
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

    const openDeleteModal = (planet) => {
        handleClose();
        setPlanetToDelete(planet);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setPlanetToDelete(null);
        setShowDeleteModal(false);
    };

    const openModifyModal = (planet) => {
        handleClose();
        setPlanetToModify(planet);
        setShowModifyModal(true);
    };

    const closeModifyModal = () => {
        setPlanetToModify(null);
        setShowModifyModal(false);
    };

    const openViewModal = (planet) => {
        handleClose();
        setToView(planet);
        setShowViewModal(true);
    };

    const closeViewModal = () => {
        setToView(null);
        setShowViewModal(false);
    };

    const handleSearch = (text) => {
        const trimmedText = text.trim().toLowerCase();

        if (trimmedText) {
            const filteredResults = allRegisters.filter(planet =>
                planet.Nombre.toLowerCase().startsWith(trimmedText)
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
        if (planetToDelete) {
            try {
                await Deletecharacter(planetToDelete._id);
                setShowDeleteSuccessModal(true);
                fetchAllRegisters(); 
            } catch (error) {
                console.error("Error al eliminar el planeta: ", error.message);
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
                <h1>Planetas</h1>
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
                            <th>Diametro</th>
                            <th>Periodo de Rotacion</th>
                            <th>Periodo Orbital</th>
                            <th>Gravedad</th>
                            <th>Poblacion</th>
                            <th>Clima</th>
                            <th>Terreno</th>
                            <th>Superficie de Agua</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(planet => (
                            <tr key={planet._id}>
                                <td>{GetHomologation(planet.Nombre)}</td>
                                <td>{GetHomologation(planet.Diametro)}</td>
                                <td>{GetHomologation(planet.Periodo_Rotacion)}</td>
                                <td>{GetHomologation(planet.Periodo_Orbital)}</td>
                                <td>{GetHomologation(planet.Gravedad)}</td>
                                <td>{GetHomologation(planet.Poblacion)}</td>
                                <td>{GetHomologation(planet.Clima)}</td>
                                <td>{GetHomologation(planet.Terreno)}</td>
                                <td>{GetHomologation(planet.Superficie_Agua)}</td>
                                <td>
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faTrash}
                                        onClick={() => openDeleteModal(planet)}
                                    />
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faFilePen}
                                        onClick={() => openModifyModal(planet)}
                                    />
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faEye}
                                        onClick={() => openViewModal(planet)}
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
                Planet_Name={planetToDelete ? planetToDelete.Nombre : ''}
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
                        fetchregister={fetchregister}
                        currentPage={currentPage}
                        planet={PlanetToModify}
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
                planet={view}
            />
        </div>
    );
}

export default Planets;
