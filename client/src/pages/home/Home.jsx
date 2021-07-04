import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
import classes from "./Home.module.css";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/post");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <React.Fragment>
      <Header />
      <div className={classes.home__container}>
        <Posts posts={posts} />
        <SideBar />
      </div>
    </React.Fragment>
  );
};

export default Home;
