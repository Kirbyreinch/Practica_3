import React from 'react';
import Modal from 'react-modal'; 
import './view.css'; 

const ViewModal = ({ isOpen, onRequestClose,  planet }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="view-modal"
            overlayClassName="modal-overlay" 
        >
            <div className='modal-content'>
                <h2>{planet?.Nombre}</h2>
                <p><strong>Diametro:</strong> {planet?.Diametro}</p>
                <p><strong>Periodo de Rotacion:</strong> {planet?.Periodo_Rotacion}</p>
                <p><strong>Periodo Orbital:</strong> {planet?.Periodo_Orbital}</p>
                <p><strong>Gravedad:</strong> {planet?.Gravedad}</p>
                <p><strong>Poblacion:</strong> {planet?.Poblacion}</p>
                <p><strong>Clima:</strong> {planet?.Clima}</p>
                <p><strong>Terreno:</strong> {planet?.Terreno}</p>
                <p><strong>Superficie de Agua:</strong> {planet?.Superficie_Agua}</p>
                <button className="Btn_agregar" onClick={onRequestClose}>Cerrar</button>
            </div>
        </Modal>
    );
};

export default ViewModal;
