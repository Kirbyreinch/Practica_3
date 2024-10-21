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
                <p><strong>Clasificacion:</strong> {specie?.Clasificacion}</p>
                <p><strong>Designacion:</strong> {specie?.Designacion}</p>
                <p><strong>Estatura:</strong> {specie?.Estatura}</p>
                <p><strong>Color de piel:</strong> {specie?.Color_de_piel}</p>
                <p><strong>Color de cabello:</strong> {specie?.Color_de_cabello}</p>
                <p><strong>Color de ojos:</strong> {specie?.Color_de_ojos}</p>
                <p><strong>Promedio de vida:</strong> {specie?.Promedio_de_vida}</p>
                <p><strong>Lenguaje:</strong> {specie?.Lenguaje}</p>
                <button className="Btn_agregar" onClick={onRequestClose}>Cerrar</button>


            </div>
        </Modal>
    );
};

export default ViewModal;
