const User=require('../models/User')
const Post=require('../models/Post')
const bcrypt = require("bcrypt");

exports.getUserById=async(req,res,next,id)=>{
    try{
        const user=await User.findById(id)
        if(!user){
            res.status(400).json("User not found")
        }

        req.profile=user
        next()
    }catch(err){
        res.status(500).json(err)
    }   
}

//GET USER
exports.getUser=async(req,res)=>{
    try{
        req.profile.password=undefined
        res.status(200).json(req.profile)
    }catch(err){
        res.status(500).json(err)
    }
}

//UPDATE USER
exports.updateUser=async(req,res)=>{
    try{
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate({_id:req.profile._id},
        {$set:req.body},{ new: true, useFindAndModify: false})

        if(!updatedUser){
            res.status(401).json("You are not authorized to update user")
        }

        updatedUser.password=undefined
        res.status(200).json(updatedUser)

    }catch(err){
        res.status(500).json(err)
    }
}

//DELETE USER
exports.deleteUser=async(req,res)=>{
    try{
        await User.findByIdAndDelete({_id:req.profile._id})
        await Post.deleteMany({name:req.profile.name})
        res.status(200).json("User account Deleted")
    }catch(err){
        res.status(500).json(err)
    }
}   