const Post = require('../models/Post')
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getPostById=async(req,res,next,id)=>{
    try{
        const post = await Post.findById(id)
        if(!post){
            req.status(400).json("Post not found")
        }
        req.post=post
        next()
    }catch(err){
        res.status(500).json(err)
    }
}

//CREATE POST
exports.createPost=async(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    console.log(req.data)
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
      const { name, description, title, category } = fields;
  
      if (!name || !description || !category || !title) {
        return res.status(400).json({
          error: "Please include all fields"
        });
      }
  
      let post = new Post(fields);
  
      if (file.picture) {
        if (file.picture.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        post.picture.data = fs.readFileSync(file.picture.path);
        post.picture.contentType = file.picture.type;
      }  

      post.save((err, post) => {
        res.json(post);
      });
    });
}

//GET POST
exports.getPost=async(req,res)=>{
    try{
        res.status(200).json(req.post)
    }catch(err){
        res.status(500).json(err)
    }
}

//GET ALL POSTS
exports.getAllPosts=async(req,res)=>{
    const userName=req.query.user
    const categName=req.query.cat
    try{
        let posts;
        if(userName){
            posts = await Post.find({name:userName})
        }
        else if(categName){
            posts = await Post.find({
                category:{$in:[categName]}
            })
        }
        else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
}
//UPDATE POST
exports.updatePost=async(req,res)=>{
    try{
        const updatedpost=await Post.findByIdAndUpdate({_id:req.post._id},
        {$set:req.body},{new:true, useFindAndModify:false})
        
        res.status(200).json(updatedpost)
    }catch(err){
        res.status(500).json(err)
    }
}

//DELETE POST
exports.deletePost=async(req,res)=>{
    try{
        await Post.findByIdAndDelete(req.post._id)
        res.status(200).json("Post deleted")
    }catch{
        res.status(500).json(err)
    }
}

exports.photo = (req, res, next) => {
    if (req.post.picture.data) {
      res.set("Content-Type", req.post.picture.contentType);
      return res.send(req.post.picture.data);
    }
    next();
  };

