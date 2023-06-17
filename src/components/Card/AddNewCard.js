import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import "./addnewcard.css";
import axios from "axios";

const AddNewCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    city: "",
    country: "",
    email: "",
    phone: "",
  });

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log("Form submitted!");

    axios.post("http://localhost:8081/member", formData).then((res) => {
      console.log("res-->", res);
      if (res.data.Status == "Success") {
        alert("Success");
        setIsOpen(false);
        setFormData({
          name: "",
          gender: "",
          city: "",
          country: "",
          email: "",
          phone: "",
        });
      }
    });
  };

  return (
    <>
      <div className="container_card" onClick={openPopup}>
        <div className="add_card">
          <h1>
            Add a <br />
            New User
          </h1>
          <div className="arrow_icon">
            <BsArrowRight />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="popup">
          <form className="form" onSubmit={handleSubmit}>
            <div className="cross">
              <span onClick={closePopup}>
                <RxCross2 />
              </span>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-col">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-col">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-col">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-rowbtn">
              <button type="submit">Add another PhoneNumber</button>
            </div>
            <div className="form-rowbtn add_candidate">
              <button type="submit">Add Candidate</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddNewCard;
