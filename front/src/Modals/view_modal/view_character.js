import React from 'react';
import Modal from 'react-modal';
import './view.css';

const ViewModal = ({ isOpen, onRequestClose, character }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="view-modal"
            overlayClassName="modal-overlay"
        >
            <div className='modal-content'>
                <h2>{character?.Nombre}</h2>
                <div className="field">
                    <strong>Altura:</strong> <span>{character?.Altura}</span>
                </div>
                <div className="field">
                    <strong>Peso:</strong> <span>{character?.Masa}</span>
                </div>
                <div className="field">
                    <strong>Color de Cabello:</strong> <span>{character?.Color_Cabello}</span>
                </div>
                <div className="field">
                    <strong>Color de Piel:</strong> <span>{character?.Color_de_Piel}</span>
                </div>
                <div className="field">
                    <strong>Color de Ojos:</strong> <span>{character?.Color_Ojos}</span>
                </div>
                <div className="field">
                    <strong>Fecha de Nacimiento:</strong> <span>{character?.Fecha_Nacimiento}</span>
                </div>
                <div className="field">
                    <strong>Género:</strong> <span>{character?.Genero}</span>
                </div>
                <button className="Btn_agregar" onClick={onRequestClose}>Cerrar</button>
            </div>
        </Modal>
    );
};

export default ViewModal;
