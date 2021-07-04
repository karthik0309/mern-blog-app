import React, { useState } from "react";
import classes from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useGlobalStateValue } from "../../globalState/Context";
import {githubLink,linkedInLink} from '../../constants/constants'

const NavBar = () => {
  const { user, dispatch } = useGlobalStateValue();
  const [showSideNav, setShowSideNav] = useState(false);
  const [sideNavClass, setSideNavClass] = useState([classes.nav__center]);
  const handleSideNavClick = () => {
    if (!showSideNav) {
      setSideNavClass([classes.nav__center, classes.show]);
    } else {
      setSideNavClass([classes.nav__center]);
    }
    setShowSideNav(!showSideNav);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className={classes.nav__container}>
      <div className={classes.nav__left}>
        <i className=" fab fa-facebook-square"></i>
        <i className=" fab fa-instagram-square"></i>
        <a href={githubLink}>
          <i className=" fab fa-github-square"></i>
        </a>
        <a href={linkedInLink}>
          <i className=" fab fa-linkedin"></i>
        </a>
      </div>
      <div className={sideNavClass.join(" ")}>
        <ul className={classes.nav__list}>
          <Link className={classes.nav__item} to="/" onClick={handleSideNavClick}>
            HOME
          </Link>
          <Link className={classes.nav__item} to="/About" onClick={handleSideNavClick}>
            ABOUT
          </Link>
          <Link className={classes.nav__item} to="/Write" onClick={handleSideNavClick}>
            WRITE
          </Link>
          {user && (
            <Link
              className={classes.nav__item}
              to="/Login"
              onClick={handleLogout}
            >
              LOGOUT
            </Link>
          )}
        </ul>
      </div>
      <div className={classes.nav__right}>
        {user ? (
          <div className={classes.nav__right__items}>
            <Link className={classes.nav__item} to="/Settings">
              {user.profilePic === "" ? (
                <i className="fas fa-user" />
              ) : (
                <img
                  className={classes.pofile__img}
                  src={user.profilePic}
                  alt=""
                />
              )}
            </Link>
          </div>
        ) : (
          <div className={classes.nav__right__items}>
            <Link to="/SignUp" className={classes.nav__item} onClick={handleSideNavClick}>
              SIGNUP
            </Link>
            <Link to="/Login" className={classes.nav__item} onClick={handleSideNavClick}>
              LOGIN
            </Link>
          </div>
        )}
      </div>
      <div className={classes.hamburger} onClick={handleSideNavClick}>
        <div className={classes.h1}></div>
        <div className={classes.h1}></div>
        <div className={classes.h1}></div>
      </div>
    </div>
  );
};

export default NavBar;
