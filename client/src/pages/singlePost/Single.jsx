import React from "react";
import classes from "./Single.module.css";
import SideBar from "../../components/sidebar/SideBar";
import SinglePost from "../../components/singlePost/SinglePost";

const Single = () => {
  return (
    <div className={classes.main__container}>
      <SinglePost />
      <SideBar />
    </div>
  );
};

export default Single;
