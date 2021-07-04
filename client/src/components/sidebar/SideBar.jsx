import React, { useState, useEffect } from "react";
import classes from "./SideBar.module.css";
import { aboutMeImg, aboutMeContent } from "../../constants/constants";
import { Link } from "react-router-dom";
import axios from "axios";
import {githubLink,linkedInLink} from '../../constants/constants'
const SideBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/category/");
      setCategories(res.data);
    };
    getCategories();
  }, []);
  return (
    <div className={classes.sidebar__container}>
      <div className={classes.sidebar__item}>
        <span className={classes.sidebar__title}>ABOUT ME</span>
        <img src={aboutMeImg} alt="aboutMe" />
        <p>{aboutMeContent}</p>
      </div>
      <div className={classes.sidebar__item}>
        <span className={classes.sidebar__title}>CATEGORIES</span>
        <ul className={classes.sidebar__list}>
          {categories.map((ele, index) => (
            <Link
              to={`/?cat=${ele.name}`}
              className={classes.sidebar__list__item}
              key={index}
            >
              {ele.name}
            </Link>
          ))}
        </ul>
      </div>
      <div className={classes.sidebar__item}>
        <span className={classes.sidebar__title}>FOLLOW US</span>
        <div className={classes.sidebar__links}>
          <i className="fab fa-facebook-square"></i>
          <i className="fab fa-instagram-square"></i>
          <a href={githubLink}>
            <i className="fab fa-github-square"></i>
          </a>
          <a href={linkedInLink}>
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
