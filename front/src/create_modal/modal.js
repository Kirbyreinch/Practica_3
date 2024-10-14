import React from 'react';
import './create.css';

const Modal = ({ show, handleClose, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button className='Btn_agregar' onClick={handleClose}>Cerrar</button>
            </section>
        </div>
    );
};

export default Modal;