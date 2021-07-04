import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import classes from "./SinglePost.module.css";
import { defaultPostImage } from "../../constants/constants";
import { Link } from "react-router-dom";
import { useGlobalStateValue } from "../../globalState/Context";

const SinglePost = () => {
    
    const currLocation = useLocation();
    const postId = currLocation.pathname.split("/")[2];
    const { user } = useGlobalStateValue();

    const [postData, setPostData] = useState({});
    const [editPost, setEditPost] = useState({
        title: "",
        description: "",
        updateMode: false,
    });

    const {title,description} = editPost
    useEffect(() => {
        const fetchSinglePost = async () => {
        const res = await axios.get(`/post/${postId}`);
        setPostData(res.data);
        setEditPost({
            title:res.data.title,
            description:res.data.description
            })
        };
        fetchSinglePost();
    },[postId]);
    
    const handleDelete = async () => {
        try {
            await axios.delete(`/post/delete/${postId}`);
            window.location.replace("/");
        } catch (err) {
            console.log(err);
        }
    };
    const handleEdit = async () => {
        setEditPost({ ...editPost, updateMode: true });
    };
    
    const handleEditChange=(name)=>(event)=>{
        setEditPost({...editPost,[name]:event.target.value})
    }

    const sendUpdatedPost = async()=>{
        try{
            await axios.put(`/post/update/${postId}`,{
                title,
                description
            })
            window.location.reload()
            setEditPost({...editPost,updateMode:false})
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className={classes.single__post}>
      <div className={classes.post__container}>
        <img
          src={postData.picture ? `/post/photo/${postId}` : defaultPostImage}
          alt="post"
          className={classes.post__image}
        />

        {editPost.updateMode ? (
          <input
            type="text"
            onChange={handleEditChange("title")}
            value={title}
            className={classes.post__title__input}
            autoFocus
          />
        ) : (
          <h1 className={classes.post__title}>
            {postData.title}
            {user?.name === postData.name && (
              <div className={classes.post__edit}>
                <i className="far fa-edit" onClick={handleEdit}></i>
                <i className="far fa-trash-alt" onClick={handleDelete}></i>
              </div>
            )}
          </h1>
        )}

        <div className={classes.post__info}>
          <span className={classes.post__author}>
            Author:
            <Link to={`/?user=${postData.name}`} className="link">
              {postData.name}
            </Link>
          </span>
          <span className={classes.post__date}>
            {new Date(postData.createdAt).toDateString()}
          </span>
        </div>

        {editPost.updateMode ? (
          <textarea
            type="text"
            onChange={handleEditChange("description")}
            value={description}
            className={classes.post__description__input}
          />
        ) : (
          <p className={classes.post__description}>{postData.description}</p>
        )}
        {editPost.updateMode &&
        <button 
        className={classes.update__button}
        onClick={sendUpdatedPost}>
            Update
        </button>}
      </div>
    </div>
  );
};

export default SinglePost;
