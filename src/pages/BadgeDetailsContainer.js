import React from "react";
//Importando Loading y Error
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
//Importando api
import api from "../api";
import BadgeDetails from "./BadgeDetails";

//Creando componente que se encarga de la lógica
class BadgeDetailsContainer extends React.Component {
    state = {
        loading: true,
        error: null,
        data: undefined,
        modalIsOpen: false,
    };

    //Montaje componente
    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ loading: true, error: null });

        try {
            //Petición a la API
            const data = await api.badges.read(this.props.match.params.badgeId);
            this.setState({ loading: false, data: data });
        } catch (error) {
            this.setState({ loading: false, error: error });
        }
    };

    //Abrir modal
    handleOpenModal = (e) => {
        this.setState({ modalIsOpen: true });
    };

    //Cerrar modal
    handleCloseModal = (e) => {
        this.setState({ modalIsOpen: false });
    };

    //Eliminar modal
    handleDeleteBadge = async () => {
        this.setState({ loading: true, error: null });

        //Peticion a la API
        try {
            await api.badges.remove(
                this.props.match.params.badgeId
            )

            //Redirigimos el usuario a la pagina badges
            this.props.history.push('/badges');
        } catch (error) {
            this.setState({ loading: false, error: error });
        }
    }

    render() {
        //Se ejecuta cuando la petición está cargando
        if (this.state.loading) {
            return <PageLoading />;
        }

        //Se ejecuta cuando la petición tira error
        if (this.state.error) {
            return <PageError error={this.state.error} />;
        }

        const badge = this.state.data;

        return (
            <BadgeDetails
                onCloseModal={this.handleCloseModal}
                onOpenModal={this.handleOpenModal}
                modalIsOpen={this.state.modalIsOpen}
                onDeleteBadge={this.handleDeleteBadge}
                badge={badge}
            />
        );
    }
}

export default BadgeDetailsContainer;
