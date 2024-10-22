import React from 'react';
import Modal from 'react-modal'; 
import './view.css'; 

const ViewModal = ({ isOpen, onRequestClose, starship }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="view-modal"
            overlayClassName="modal-overlay" 
        >
            <div className='modal-content'>
                <h2>{starship?.Nombre}</h2>
                <div className="field">
                    <strong>Modelo:</strong> <span>{starship?.Modelo}</span>
                </div>
                <div className="field">
                    <strong>Clase:</strong> <span>{starship?.Clase}</span>
                </div>
                <div className="field">
                    <strong>Tamaño:</strong> <span>{starship?.Tamaño}</span>
                </div>
                <div className="field">
                    <strong>Número de Pasajeros:</strong> <span>{starship?.Numero_de_Pasajeros}</span>
                </div>
                <div className="field">
                    <strong>Máxima Velocidad Atmosférica:</strong> <span>{starship?.Maxima_velocidad_atmosferica}</span>
                </div>
                <div className="field">
                    <strong>Hiperimpulsor:</strong> <span>{starship?.Hiperimpulsor}</span>
                </div>
                <div className="field">
                    <strong>MGLT:</strong> <span>{starship?.MGLT}</span>
                </div>
                <div className="field">
                    <strong>Capacidad de Carga:</strong> <span>{starship?.Capacidad_de_carga}</span>
                </div>
                <div className="field">
                    <strong>Tiempo Máximo de Combustibles:</strong> <span>{starship?.Tiempo_Maximo_Cobustibles}</span>
                </div>
                <button className="Btn_agregar" onClick={onRequestClose}>Cerrar</button>
            </div>
        </Modal>
    );
};

export default ViewModal;
