import React from "react";
import "./home.css";
import Card from "../Card/Card";
import CardList from "../Card/CardList";

const Home = () => {
  return (
    <>
      <div className="home_container">
        <div className="sortby_male_female">
          <button className="male btn">Male</button>
          <button className="female btn">Female</button>
        </div>
        <div className="card_container">
          <CardList/>
        </div>
      </div>
    </>
  );
};

export default Home;
