import React from "react";
import classes from "./Header.module.css";
import { headerImg } from "../../constants/constants";

const Header = () => {
  return (
    <div className={classes.header__container}>
      <div className={classes.header__title}>
        <span className={classes.small}>Mern Stack</span>
        <span className={classes.large}>Blog App</span>
      </div>
      <img className={classes.header__image} src={headerImg} alt="img" />
    </div>
  );
};

export default Header;
