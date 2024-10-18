import React from 'react';
import '../message_modal/message.css';

const DeleteComplete = ({ show, handleClose }) => {
    const showHideClassName = show ? "message display-block-message " : "message display-none-message ";

    return (
        <div className={showHideClassName} onClick={handleClose}>
            <section className="success-message" onClick={e => e.stopPropagation()}>
                <div>Registro Eliminado exitosamente</div>
                <button className='Btn_agregar' onClick={handleClose}>Cerrar</button>
            </section>
        </div>
    );
};

export default DeleteComplete;
