import React from "react";
import classes from "./Posts.module.css";
import Post from "../post/Post";

const Posts = ({ posts }) => {
  return (
    <div className={classes.post__container}>
      {posts.map((ele, index) => (
        <Post post={ele} key={index} />
      ))}
    </div>
  );
};

export default Posts;
