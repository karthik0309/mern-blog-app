import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
import classes from "./Home.module.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation()

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/post"+search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
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
