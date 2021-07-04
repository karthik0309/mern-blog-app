import React, { useState } from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { useGlobalStateValue } from "../../globalState/Context";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    error: "",
  });

  const { email, password, error } = userDetails;
  const { dispatch, isFetching } = useGlobalStateValue();

  const handleInputchange = (name) => (e) => {
    setUserDetails({ ...userDetails, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/signin", {
        email,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setUserDetails({ ...userDetails, error: err });
    }
  };
  return (
    <div className={classes.login__container}>
      {isFetching && <Spinner />}
      {error !== "" && <div className={classes.error}>{error}</div>}

      <span className={classes.login__title}>Login</span>
      <form className={classes.login__form} onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className={classes.login__input}
          type="text"
          placeholder="email..."
          onChange={handleInputchange("email")}
        />

        <label>Password</label>
        <input
          className={classes.login__input}
          type="password"
          placeholder="password..."
          onChange={handleInputchange("password")}
        />

        <button className={classes.login__button} type="submit">
          Login
        </button>
      </form>
      <Link to="/SignUp">
        <button className={classes.register}>Register</button>
      </Link>
    </div>
  );
};

export default Login;
