import React, { useState, useEffect} from "react";
import classes from "./NewPost.module.css";
import axios from "axios";
import { defaultNewPost } from "../../constants/constants";
import { useGlobalStateValue } from "../../globalState/Context";

const NewPost = () => {
  const { user } = useGlobalStateValue();
  const name = user.name;
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    picture: "",
    category: "",
    categories:[],
    name: name,
    success:true
  });

  const { picture, categories } = postData;

  useEffect(()=>{
      const getAllCategories = async()=>{
        try{
            const res = await axios.get('/category/')
            setPostData({...postData,categories:res.data})
            console.log(res.data)
        }catch(err){
          console.log(err)
        }
      }
      getAllCategories()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData(e.target)
      formData.append('name',name)
      await axios({
        method: 'post',
        url: '/post/create',
        data: formData,
      });
      setPostData({...postData,success:true})
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (name) => (event) => {
    event.preventDefault();
    const value =name === "picture" ? event.target.files[0] : event.target.value;
    setPostData({ ...postData, [name]: value,success:false});
  };

  return (
    <div className={classes.new__post}>
      <img
        className={classes.post__image}
        src={picture ? URL.createObjectURL(picture) : defaultNewPost}
        alt=""
      />
      {
        postData.success && <p className={classes.success}>Post added</p>
      }
      <form className={classes.post__form} onSubmit={handleSubmit} >
        <div className={classes.post__form__group}>
          <label htmlFor="fileInput" className={classes.label}>
            <i className="fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image"
            name="picture"
            style={{ display: "none" }}
            onChange={handleChange("picture")}
          />

          <input
            className={classes.post__input}
            placeholder="Title"
            type="text"
            name="title"
            autoFocus={true}
            onChange={handleChange("title")}
          />

          <select name="category" 
          id="category" 
          className={classes.post__input}
          onChange={handleChange("category")}>
            <option>Categories</option>
            {categories && categories.map((ele)=>(
              <option key={ele._id} value={ele.name}>
                {ele.name}
              </option>
            ))}
          </select>
          
        </div>

        <div className={classes.post__form__group}>
          <textarea
            className={[classes.post__input, classes.post__text].join(" ")}
            placeholder="Tell your story..."
            type="text"
            name="description"
            autoFocus={true}
            onChange={handleChange("description")}
          />
        </div>
        <button className={classes.post__submit} type="submit">
          Publish
        </button>
      </form>
      
    </div>
  );
};

export default NewPost;