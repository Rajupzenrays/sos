import React from "react";
import "./card.css";

const Card = ({ name, age, country, city, email, phone, picture }) => {
  return (
    <div className="container_card">
      <div className="card">
        <img src={picture} alt="Profile" />
        <span className="age"><h5>{age}</h5></span>
        <h2>{name}</h2>
        <p>{city}, {country}</p>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
    </div>
  );
};

export default Card;
