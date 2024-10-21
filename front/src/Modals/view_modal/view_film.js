import React from 'react';
import Modal from 'react-modal'; 
import './view.css'; 

const ViewModal = ({ isOpen, onRequestClose, film }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="view-modal"
            overlayClassName="modal-overlay" 
        >
            <div className='modal-content'>
                <h2>{film?.Titulo}</h2>
                <p><strong>Director:</strong> {film?.Director}</p>
                <p><strong>Productor:</strong> {film?.Productor}</p>
                <button className="Btn_agregar" onClick={onRequestClose}>Cerrar</button>
            </div>
        </Modal>
    );
};

export default ViewModal;
