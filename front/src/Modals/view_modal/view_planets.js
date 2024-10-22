import React from 'react';
import Modal from 'react-modal'; 
import './view.css'; 

const ViewModal = ({ isOpen, onRequestClose, planet }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="view-modal"
            overlayClassName="modal-overlay" 
        >
            <div className='modal-content'>
                <h2>{planet?.Nombre}</h2>
                <div className="field">
                    <strong>Diámetro:</strong> <span>{planet?.Diametro}</span>
                </div>
                <div className="field">
                    <strong>Periodo de Rotación:</strong> <span>{planet?.Periodo_Rotacion}</span>
                </div>
                <div className="field">
                    <strong>Periodo Orbital:</strong> <span>{planet?.Periodo_Orbital}</span>
                </div>
                <div className="field">
                    <strong>Gravedad:</strong> <span>{planet?.Gravedad}</span>
                </div>
                <div className="field">
                    <strong>Población:</strong> <span>{planet?.Poblacion}</span>
                </div>
                <div className="field">
                    <strong>Clima:</strong> <span>{planet?.Clima}</span>
                </div>
                <div className="field">
                    <strong>Terreno:</strong> <span>{planet?.Terreno}</span>
                </div>
                <div className="field">
                    <strong>Superficie de Agua:</strong> <span>{planet?.Superficie_Agua}</span>
                </div>
                <button className="Btn_agregar" onClick={onRequestClose}>Cerrar</button>
            </div>
        </Modal>
    );
};

export default ViewModal;
