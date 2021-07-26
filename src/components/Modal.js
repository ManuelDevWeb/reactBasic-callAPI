import React from 'react';
import ReactDOM from 'react-dom';
//Importando estilos
import './styles/Modal.css';

function Modal(props) {
    //Si open es falso no se muestra nada!
    if (!props.isOpen) {
        return null;
    }

    return (
        ReactDOM.createPortal(
            <div className="Modal">
                <div className="Modal__container">
                    <button onClick={props.onClose} className="Modal__close-button">❌</button>
                    {
                        //Children es el valor que viene desde el llamado del Modal en DeleteBadgeModal
                        props.children
                    }
                </div>
            </div>,
            document.querySelector('#modal')
        )
    )
}

export default Modal;