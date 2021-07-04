import React from "react";
import { Link } from "react-router-dom";
import { defaultPostImage } from "../../constants/constants";
import classes from "./Post.module.css";

const Posts = ({ post }) => {
  const img = post.picture ? `/post/photo/${post._id}` : defaultPostImage;
  return (
    <div className={classes.post__container}>
      <img src={img} alt="" className={classes.post__image} />
      <div className={classes.post__info}>
        <div className={classes.post__categories}>
          {post.category.map((cat, index) => (
            <span className={classes.post__category} key={index}>
              <Link className={classes.link} to={`/posts?cat=${cat}`}>
                {cat}
              </Link>
            </span>
          ))}
        </div>
        <span className={classes.post__title}>
          <Link to={`/post/${post._id}`} className={classes.link}>
            {post.title}
          </Link>
        </span>
        <hr />
        <span className={classes.post__date}>
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className={classes.post__description}>{post.description}</p>
    </div>
  );
};

export default Posts;
