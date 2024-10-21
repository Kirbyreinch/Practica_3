// ViewModal.js
import React from 'react';
import Modal from 'react-modal';
import './view.css';

const ViewModal = ({ isOpen, onRequestClose, character }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="view-modal"
            overlayClassName="modal-overlay" // Clase para el fondo
        >
            <div className='modal-content'>
                <h2>{character?.Nombre}</h2>
                <p><strong>Altura:</strong> {character?.Altura}</p>
                <p><strong>Peso:</strong> {character?.Masa}</p>
                <p><strong>Color de cabello:</strong> {character?.Color_Cabello}</p>
                <p><strong>Color de piel:</strong> {character?.Color_de_Piel}</p>
                <p><strong>Color de ojos:</strong> {character?.Color_Ojos}</p>
                <p><strong>Fecha de nacimiento:</strong> {character?.Fecha_Nacimiento}</p>
                <p><strong>Género:</strong> {character?.Genero}</p>
                <button className="Btn_agregar" onClick={onRequestClose}>Cerrar</button>
            </div>
        </Modal>
    );
};

export default ViewModal;
