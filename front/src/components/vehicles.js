
import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/create_modal/modal';
import MyForm from '../Modals/create_modal/create_vehicles';
import ConfirmDeleteModal from '../Modals/Delete_modals/delete_vehicles';
import { Deletevehicles } from '../request/vehicles';
import DeleteComplete from '../Modals/message_modal/complete_message';
import Header from '../header/header';

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    const [vehiclesToDelete, setvehiclesToDelete] = useState(null);
    const [vehiclesToModify, setvehiclesToModify] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [view, setToView] = useState(null);
    const [filtered, setFiltered] = useState([]);
    const [allRegisters, setAllRegisters] = useState([]);
    const [modalType, setModalType] = useState(null); //    ESTADO PARA MENSAJES MODAL  //


    const limit = 10;
    const fetchregister = async (page) => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedVehicles = filtered.slice(startIndex, endIndex);
        setVehicles(paginatedVehicles);
        setTotalPages(Math.ceil(filtered.length / limit));
    };

    const fetchAllRegisters = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/Vehiculos/modulo/todos`);
            setAllRegisters(response.data.vehiculos);
            setFiltered(response.data.vehiculos);
            setTotalPages(Math.ceil(response.data.total / limit));
            fetchregister(1);
        } catch (error) {
            console.error("Error al obtener todas las Naves:", error);
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
        closeViewModal();
    };

    // CERRAR TODAS LAS VENTANAS
    const handleClose = () => {
        fetchAllRegisters();
        setShowModal(false);
        setShowDeleteModal(false);
        setShowModifyModal(false);
        setShowViewModal(false);
        closeViewModal();
    };


    //VENTANA DE ELIMINAR
    const openDeleteModal = (vehicles) => {
        handleClose(); // Cerrar todos los modales
        setvehiclesToDelete(vehicles);
        setShowDeleteModal(true);
    };
    //CERRAR VENTANA DE ELIMINAR
    const closeDeleteModal = () => {
        setvehiclesToDelete(null);
        setShowDeleteModal(false);
    };


    //VENTANA DE MODIFICAR
    const openModifyModal = (vehicles) => {
        handleClose();
        setvehiclesToModify(vehicles);
        setModalType('modify');
        setShowModifyModal(true);
    };


    //CERRAR VENTANA DE MODIFICAR
    const closeModifyModal = () => {
        setvehiclesToModify(null);
        setShowModifyModal(false);
    };


    const openViewModal = (vehicles) => {
        handleClose();
        setToView(vehicles);
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
            filteredResults = allRegisters.filter(vehicles =>
                vehicles.Nombre.toLowerCase().startsWith(trimmedText)
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
        if (vehiclesToDelete) {
            try {
                await Deletevehicles(vehiclesToDelete._id);
                setModalType('delete');
                setShowDeleteSuccessModal(true);
                fetchAllRegisters();
            } catch (error) {
                console.error("Error al eliminar el vehiculo: ", error.message);
            } finally {
                closeDeleteModal();
            }
        }
    };

 

    return (
        <div className="contenedor">
            <Header onSearch={handleSearch} />
            <div className="Titulo">
                <h1>Vehículos</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar' onClick={handleOpen}>+ Agregar Registro</button>
                <Modal show={showModal} handleClose={handleClose}>
                    <MyForm handleClose={handleClose} fetchCharacter={fetchregister} currentPage={currentPage}
                        onSuccess={() => {
                            handleClose();
                        }}
                        setShowDeleteSuccessModal={setShowDeleteSuccessModal}
                        setModalType={setModalType}
                        />
                </Modal>
            </div>
            <div className="DatosBD">
            {vehicles.length === 0 ? (
                <div className="no_registers">No hay ningun registro</div>
            ) : (
                <table className='Table'>
                    <thead>
                        <tr>
                        <th>Nombre</th>
                            <th>Modelo</th>
                            <th>Clase</th>
                            <th>Tamaño</th>
                            <th>Número de Pasajeros</th>
                            <th>Máxima Velocidad Atmosférica</th>
                            <th>Capacidad Máxima</th>
                            <th>Tiempo Máximo de Combustibles</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(vehicle => (
                          <tr key={GetHomologation(vehicle._id)}>
                          <td>{GetHomologation(vehicle.Nombre)}</td>
                          <td>{GetHomologation(vehicle.Modelo)}</td>
                          <td>{GetHomologation(vehicle.Clase)}</td>
                          <td>{GetHomologation(vehicle.Tamaño)}</td>
                          <td>{GetHomologation(vehicle.Numero_de_Pasajeros)}</td>
                          <td>{GetHomologation(vehicle.Maxima_velocidad_atmosferica)}</td>
                          <td>{GetHomologation(vehicle.Capacidad_Maxima)}</td>
                          <td>{GetHomologation(vehicle.Tiempo_Maximo_Cobustibles)}</td>
                                <td>
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faTrash}
                                        onClick={() => openDeleteModal(vehicle)}
                                    />
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faFilePen}
                                        onClick={() => openModifyModal(vehicle)}
                                    />
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faEye}
                                        onClick={() => openViewModal(vehicle)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </div>

            {/* PAGINACION */}
            <div className="Paginacion">
                <div className="pagination">
                    <br />
                    <button className="Btn_agregar" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                    <span> Página {currentPage} de {totalPages} </span>
                    <button className="Btn_agregar" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages || vehicles.length === 0}>Siguiente</button>
                </div>
            </div>

            {/* MOSTRAR VENTANA ELIMNAR */}
            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onRequestClose={closeDeleteModal}
                onConfirm={handleDelete}
                Vehicle_Name={vehiclesToDelete ? vehiclesToDelete.Nombre : ''}
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
                    <MyForm
                        handleClose={() => {
                            closeModifyModal();
                            fetchAllRegisters();
                        }}
                        fetchAllRegisters={fetchAllRegisters}
                        viewData={vehiclesToModify}
                        isModifyMode={true}
                        setShowDeleteSuccessModal={setShowDeleteSuccessModal}
                        setModalType={setModalType}
                        onSuccess={() => {
                            setShowDeleteSuccessModal(true);
                            fetchAllRegisters();
                        }}
                    />
                </Modal>
            )}


            {/* MODAL   VER */}
                {/* MODAL   VER */}
                {showViewModal && (
                <Modal show={showViewModal} handleClose={closeViewModal}>
                    <MyForm
                        handleClose={closeViewModal}
                        viewData={view}
                        isViewMode={true} 
                    />
                </Modal>
            )}
        </div>
    );
}

export default Vehicles;
