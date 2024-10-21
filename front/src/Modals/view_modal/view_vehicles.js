import React from 'react';
import Modal from 'react-modal'; 
import './view.css'; 

const ViewModal = ({ isOpen, onRequestClose, vehicle }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="view-modal"
            overlayClassName="modal-overlay" 
        >
            <div className='modal-content'>
                <h2>{vehicle?.Nombre}</h2>
                <p><strong>Modelo:</strong> {vehicle?.Modelo}</p>
                <p><strong>Clase:</strong> {vehicle?.Clase}</p>
                <p><strong>Tamaño:</strong> {vehicle?.Tamaño}</p>
                <p><strong>Numero de Pasajeros:</strong> {vehicle?.Numero_de_Pasajeros}</p>
                <p><strong>Maxima velocidad atmosferica:</strong> {vehicle?.Maxima_velocidad_atmosferica}</p>
                <p><strong>Capacidad_Maxima:</strong> {vehicle?.Capacidad_Maxima}</p>
                <p><strong>Tiempo Maximo de Cobustibles:</strong> {vehicle?.Tiempo_Maximo_Cobustibles}</p>
                <button className="Btn_agregar" onClick={onRequestClose}>Cerrar</button>

            </div>
        </Modal>
    );
};

export default ViewModal;
