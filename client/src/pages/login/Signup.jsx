import React, { useState } from "react";
import classes from "./Signup.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });
  const { name, email, password } = userData;

  const handleInputChange = (name) => (event) => {
    setUserData({ ...userData, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/signup", {
        name,
        email,
        password,
      });
      if (res.data.error) {
        setUserData({ ...userData, error: res.data.error });
        return;
      }
      window.location.replace("/Login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.signup__contaier}>
      {userData.error !== "" && (
        <div className={classes.error}>{userData.error}</div>
      )}
      <span className={classes.signup__title}>Register</span>
      <form className={classes.signup__form} onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className={classes.signup__input}
          type="text"
          placeholder="Username..."
          onChange={handleInputChange("name")}
        />

        <label>Email</label>
        <input
          className={classes.signup__input}
          type="text"
          placeholder="Email..."
          onChange={handleInputChange("email")}
        />

        <label>Password</label>
        <input
          className={classes.signup__input}
          type="password"
          placeholder="Password..."
          onChange={handleInputChange("password")}
        />

        <button className={classes.signup__button} type="submit">
          Register
        </button>
      </form>
      <Link to="/Login">
        <button className={classes.login__button}>Login</button>
      </Link>
    </div>
  );
};

export default Signup;
