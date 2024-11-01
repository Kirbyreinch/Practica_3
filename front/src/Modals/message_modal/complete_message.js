import React from 'react';
import '../message_modal/message.css';

const DeleteComplete = ({ show, handleClose, modalType }) => {
    const showHideClassName = show ? "message display-block-message" : "message display-none-message";

    return (
        <div className={showHideClassName} onClick={handleClose}>
            <section className="success-message" onClick={e => e.stopPropagation()}>
                {modalType === 'delete' ? (
                    <div>Registro Eliminado exitosamente</div>
                ) : modalType === 'modify' ? (
                    <div>Registro Modificado exitosamente</div>
                ) : (
                    <div>Registro Agregado exitosamente</div>
                )}
                <button className='Btn_agregar' onClick={handleClose}>Cerrar</button>
            </section>
        </div>
    );
};

export default DeleteComplete;
