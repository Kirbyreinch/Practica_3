import React from 'react';
import Modal from 'react-modal'; 
import './view.css'; 

const ViewModal = ({ isOpen, onRequestClose,starship }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="view-modal"
            overlayClassName="modal-overlay" 
        >
            <div className='modal-content'>
                <h2>{starship?.Nombre}</h2>
                <p><strong>Modelo:</strong> {starship?.Modelo}</p>
                <p><strong>Clase:</strong> {starship?.Clase}</p>
                <p><strong>Tamaño:</strong> {starship?.Tamaño}</p>
                <p><strong>Numero de Pasajeros:</strong> {starship?.Numero_de_Pasajeros}</p>
                <p><strong>Maxima velocidad atmosferica:</strong> {starship?.Maxima_velocidad_atmosferica}</p>
                <p><strong>Hiperimpulsor:</strong> {starship?.Hiperimpulsor}</p>
                <p><strong>MGLT:</strong> {starship?.MGLT}</p>
                <p><strong>Capacidad de carga:</strong> {starship?.Capacidad_de_carga}</p>
                <p><strong>Tiempo Maximo de Cobustibles:</strong> {starship?.Tiempo_Maximo_Cobustibles}</p>
                <button className="Btn_agregar" onClick={onRequestClose}>Cerrar</button>


            </div>
        </Modal>
    );
};

export default ViewModal;
