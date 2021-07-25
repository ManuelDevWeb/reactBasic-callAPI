import React from 'react';
//Importando estilos
import './styles/PageError.css';

//Creando componente
const PageError = (props) => {
    const { error } = props;

    return (
        <div className="PageError">
            <p>❌{error.message}❌</p>
        </div>
    );
}

export default PageError;