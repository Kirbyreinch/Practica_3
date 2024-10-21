import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/create_modal/modal';
import MyForm from '../Modals/create_modal/create_vehicles';
import ConfirmDeleteModal from '../Modals/Delete_modals/delete_vehicles';
import ModifyModelVehicles from '../Modals/modify_modals/modify_vehicles'
import { Deletevehicles } from '../request/vehicles';
import RegisterComplete from '../Modals/message_modal/registro_modal';
import DeleteComplete from '../Modals/message_modal/delete_modal';
import ViewModal from '../Modals/view_modal/view_vehicles';

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    const [vehiclesToDelete, setvehiclesToDelete] = useState(null);
    const [vehiclesToModify, setvehiclesToModify] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [view, setToView] = useState(null);


    //SE GUARDA LA RUTA PARA TOMAR LOS DATOS POR PAGINA //
    const fetchVehicles = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/Vehiculos/modulo/?page=${page}`);
            setVehicles(response.data.vehiculos);
            setTotalPages(Math.ceil(response.data.total / 10));
        } catch (error) {
            console.error("Error al obtener los Vhiculos:", error);
        }
    };

    useEffect(() => {
        fetchVehicles(currentPage);
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
        handleClose(); // Cerrar todos los modales
        setvehiclesToModify(vehicles);
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


    //SELECCIONAR ELIMINAR    
    const handleDelete = async () => {
        if (vehiclesToDelete) {
            try {
                await Deletevehicles(vehiclesToDelete._id);
                setShowDeleteSuccessModal(true);
            } catch (error) {
                console.error("Error al eliminar el Vehiculo: ", error.message);
            } finally {
                closeDeleteModal();
                fetchVehicles(currentPage);
            }
        }
    };


    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        fetchVehicles(currentPage);
    };
    return (
        //HTML
        <div className="contenedor">
            <div className="Titulo">
                <h1>Vehiculos</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar' onClick={handleOpen}>+ Agregar Registro</button>
                <Modal show={showModal} handleClose={handleClose}>
                    <MyForm handleClose={handleClose}
                        fetchVehicles={fetchVehicles}
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
                            <th>Nombre</th>
                            <th>Modelo</th>
                            <th>Clase</th>
                            <th>Tamaño</th>
                            <th>Numero de pasajeros</th>
                            <th>Maxima velocidad atmosferica</th>
                            <th>Capacidad Maxima</th>
                            <th>Tiempo maximo de combustibles</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(vehicle => (
                            <tr key={vehicle._id}>
                                <td>{vehicle.Nombre}</td>
                                <td>{vehicle.Modelo}</td>
                                <td>{vehicle.Clase}</td>
                                <td>{vehicle.Tamaño}</td>
                                <td>{vehicle.Numero_de_Pasajeros}</td>
                                <td>{vehicle.Maxima_velocidad_atmosferica}</td>
                                <td>{vehicle.Capacidad_Maxima}</td>
                                <td>{vehicle.Tiempo_Maximo_Cobustibles}</td>
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
                Vehicle_Name={vehiclesToDelete ? vehiclesToDelete.Nombre : ''}
            />


            <DeleteComplete
                show={showDeleteSuccessModal}
                handleClose={() => {
                    setShowDeleteSuccessModal(false);
                    fetchVehicles(currentPage);
                }}
            />


            {/* MOSTRAR VENTANA MODIFICAR */}
            {showModifyModal && (
                <Modal show={showModifyModal} handleClose={closeModifyModal}>
                    <ModifyModelVehicles
                        handleClose={closeModifyModal}
                        fetchVehicles={fetchVehicles}
                        currentPage={currentPage}
                        vehicle={vehiclesToModify}
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
                vehicle={view}
            />

        </div>
    );
}

export default Vehicles;



