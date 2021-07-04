import axios from "axios";
import React,{useState} from "react";
import SideBar from "../../components/sidebar/SideBar";
import { useGlobalStateValue } from "../../globalState/Context";
import classes from "./UserSettings.module.css";

const UserSettings = () => {

    const {user,dispatch} = useGlobalStateValue()
    const [userDetails,setUserDetails]=useState({
      name:user.name,
      email:user.email,
      password:user.password,
      detailsChanged:false,
      success:false
    })

    const {name, email, password,detailsChanged,success} = userDetails

    const handleUserDetailsChange=(name)=>(event)=>{
      setUserDetails({...userDetails,
        [name]:event.target.value,
        detailsChanged:true})
    }

    const sendUpdatedData=async()=>{
        await axios.put(`/update/${user._id}`,{
          name,
          email,
          password
        })
        dispatch({type:'UPDATE_USER',payload:{
          ...user,
          name:name,
          email:email
        }})
        
        setUserDetails({...userDetails,detailsChanged:false})
    }

    const deleteUserAccount=async()=>{
      try{
          await axios.delete(`/delete/${user._id}`)
          dispatch({type:'DELETE_ACCOUNT'})
          window.location.replace("/")
      }catch(err){
        console.log(err)
      }
    }

    return (
      <div className={classes.settings__container}>
        <div className={classes.settings__wrapper}>
          <div className={classes.settings__title}>
            <span className={classes.settings__title__update}>
              Update Your Account
            </span>
            <span className={classes.settings__title__delete} onClick={deleteUserAccount}>
              Delete Account
            </span>
          </div>
          <form className={classes.settings__form}>
            <label>Profile Picture</label>
            <div className={classes.settings__profile__pic}>
              {user.profilePic!=="" ? 
              <img
                src={user.profilePic}
                alt=""
              />:
              <i className="fas fa-user" />}
              <label htmlFor="fileInput">
                <i className="far fa-user-circle"></i>{" "}
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                className={classes.settings__input}
              />
            </div>
            <label>Username</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleUserDetailsChange("name")}
              value={name}
              autoComplete="off"
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleUserDetailsChange("email")}
              value={email}
              autoComplete="off"
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleUserDetailsChange("password")}
              value={password}
              autoComplete="off"
            />
            {detailsChanged&&
            <button 
            className={classes.settings__submit} 
            type="submit" 
            onClick={sendUpdatedData}
            >
              Update
            </button>}
            {success && <p className={classes.success}>Updated successfully</p>}
          </form>
        </div>
        <SideBar />
      </div>
    );
};

export default UserSettings;
