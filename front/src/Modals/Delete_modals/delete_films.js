import React from 'react';
import Modal from 'react-modal';
import './delete_modals.css';

const ConfirmDeleteModal = ({ isOpen, onRequestClose, onConfirm, Film_Title,  }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            className="modal_delete"
            overlayClassName="overlay"
        >

            {/* VENTANA DE ELIMINAR */}
            <div className="modal-main">
                <h2 className="titulo_modal">Confirmar Eliminación</h2>
                <p className='p_accion'>¿Estás seguro de que deseas eliminar la Película "{Film_Title}"?</p>
                <div className='button-conatiner'>
                    <button className="delete_button" onClick={onConfirm}>Eliminar</button>
                    <button className="cancel_button" onClick={onRequestClose}>Cancelar</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDeleteModal;
