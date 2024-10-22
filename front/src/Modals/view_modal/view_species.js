import React from 'react';
import Modal from 'react-modal'; 
import './view.css'; 

const ViewModal = ({ isOpen, onRequestClose, specie }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="view-modal"
            overlayClassName="modal-overlay" 
        >
            <div className='modal-content'>
                <h2>{specie?.Nombre}</h2>
                <div className="field">
                    <strong>Clasificación:</strong> <span>{specie?.Clasificacion}</span>
                </div>
                <div className="field">
                    <strong>Designación:</strong> <span>{specie?.Designacion}</span>
                </div>
                <div className="field">
                    <strong>Estatura:</strong> <span>{specie?.Estatura}</span>
                </div>
                <div className="field">
                    <strong>Color de piel:</strong> <span>{specie?.Color_de_piel}</span>
                </div>
                <div className="field">
                    <strong>Color de cabello:</strong> <span>{specie?.Color_de_cabello}</span>
                </div>
                <div className="field">
                    <strong>Color de ojos:</strong> <span>{specie?.Color_de_ojos}</span>
                </div>
                <div className="field">
                    <strong>Promedio de vida:</strong> <span>{specie?.Promedio_de_vida}</span>
                </div>
                <div className="field">
                    <strong>Lenguaje:</strong> <span>{specie?.Lenguaje}</span>
                </div>
                <button className="Btn_agregar" onClick={onRequestClose}>Cerrar</button>
            </div>
        </Modal>
    );
};

export default ViewModal;
