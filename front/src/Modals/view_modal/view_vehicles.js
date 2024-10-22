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
                <div className="field">
                    <strong>Modelo:</strong> <span>{vehicle?.Modelo}</span>
                </div>
                <div className="field">
                    <strong>Clase:</strong> <span>{vehicle?.Clase}</span>
                </div>
                <div className="field">
                    <strong>Tamaño:</strong> <span>{vehicle?.Tamaño}</span>
                </div>
                <div className="field">
                    <strong>Número de Pasajeros:</strong> <span>{vehicle?.Numero_de_Pasajeros}</span>
                </div>
                <div className="field">
                    <strong>Máxima Velocidad Atmosférica:</strong> <span>{vehicle?.Maxima_velocidad_atmosferica}</span>
                </div>
                <div className="field">
                    <strong>Capacidad Máxima:</strong> <span>{vehicle?.Capacidad_Maxima}</span>
                </div>
                <div className="field">
                    <strong>Tiempo Máximo de Combustibles:</strong> <span>{vehicle?.Tiempo_Maximo_Cobustibles}</span>
                </div>
                <button className="Btn_agregar" onClick={onRequestClose}>Cerrar</button>
            </div>
        </Modal>
    );
};

export default ViewModal;
