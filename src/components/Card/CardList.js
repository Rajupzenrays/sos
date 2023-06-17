import { useState, useEffect } from "react";
import Card from "./Card";
import "./cardlist.css";
import AddNewCard from "./AddNewCard";

const CardList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=4")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        console.log(data.results);
      });
  }, []);

  return (
    <div className="card-list">
      {users.map((user, index) => (
        <Card
          key={index}
          picture={user.picture.large}
          name={`${user.name.first} ${user.name.last}`}
          age={user.dob.age}
          country={user.location.country}
          city={user.location.city}
          email={user.email}
          phone={user.phone}
        />

      ))}
      <AddNewCard/>
    </div>
  );
};
export default CardList;
