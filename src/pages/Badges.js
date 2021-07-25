import React from "react";
import { Link } from "react-router-dom";
//Importando estilos
import "./styles/Badges.css";
//Importando imagen
import confLogo from "../images/badge-header.svg";
//Importando componente BadgesList
import BadgesList from "../components/BadgesList";
//Importando archivo api
import api from "../api";
//Importando componente PageLoading
import PageLoading from '../components/PageLoading';
//Importando componente PageError
import PageError from "../components/PageError";

class Badges extends React.Component {
  //State
  state = {
    loading: true,
    error: null,
    data: undefined,
  };

  //Componente Montado
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });
    //Llamado a la API, para obtener los datos
    try {
      const data = await api.badges.list();
      this.setState({ loading: false, data: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    //Se ejecuta cuando esta en estado loading
    if (this.state.loading === true) {
      return <PageLoading />;
    }

    //Se ejecuta cuando hay un error
    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }

    return (
      <React.Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img
                className="Badges_conf-logo"
                src={confLogo}
                alt="Conf Logo"
              />
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="Badges__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">
              New Badge{" "}
            </Link>{" "}
          </div>{" "}
          <BadgesList badges={this.state.data} />{" "}
        </div>{" "}
      </React.Fragment>
    );
  }
}

export default Badges;
