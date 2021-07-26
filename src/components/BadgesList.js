import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./styles/BadgesList.css";
//Importando Gravatar
import Gravatar from "../components/Gravatar";

class BadgesListItem extends React.Component {
  render() {
    return (
      <div className="BadgesListItem">
        <Gravatar
          className="BadgesListItem__avatar"
          email={this.props.badge.email}
          alt={`${this.props.badge.firstName} ${this.props.badge.lastName}`}
        />

        <div>
          <strong>
            {this.props.badge.firstName} {this.props.badge.lastName}
          </strong>
          <br />@{this.props.badge.twitter}
          <br />
          {this.props.badge.jobTitle}
        </div>
      </div>
    );
  }
}

//Custom Hook
function useSearchBadges(badges) {
  const [query, setQuery] = useState('');
  const [filteredBadges, setFilteredResults] = useState(badges);

  React.useMemo(() => {
    //Guardamos para memorizar la query y evitar cuello de botella
    const result = badges.filter(badge => {
      //Si incluye el query en el filtrado, lo devuelve
      return `${badge.firstName} ${badge.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    //Guardando los datos en el state
    setFilteredResults(result)
  }, [badges, query]);

  return { query, setQuery, filteredBadges }
}

function BadgesList(props) {
  const badges = props.badges;

  //Obteniendo los valores del custom hook
  const { setQuery, filteredBadges, query } = useSearchBadges(badges);

  /*Si no hay elementos mostramos este mensaje*/
  if (filteredBadges.length === 0) {
    return (
      <div>
        <div className="form-group">
          <label>Filter Badges</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => {
              //console.log(e.target.value)
              setQuery(e.target.value);
            }}
          />
        </div>
        <h3>No badges were found</h3>
        <Link className="btn btn-primary" to="/badges/new">
          Create new badge
        </Link>
      </div>
    );
  }

  return (
    <div className="BadgesList">
      <div className="form-group">
        <label>Filter Badges</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => {
            //console.log(e.target.value)
            setQuery(e.target.value);
          }}
        />
      </div>
      <ul className="list-unstyled">
        {filteredBadges.map((badge) => {
          return (
            <li key={badge.id}>
              <Link
                className="text-reset text-decoration-none"
                to={`/badges/${badge.id}`}
              >
                <BadgesListItem badge={badge} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

}

export default BadgesList;