import React from 'react';
//Importando estilos
import './styles/PageLoading.css';
//Importando componente Loader
import Loader from '../components/Loader';

//Creando componente
const PageLoading = () => {
    return (
        <div className="PageLoading">
            <Loader />
        </div>
    );
}

//Exportando componente
export default PageLoading;