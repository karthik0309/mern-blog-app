const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    picture:{
        data: Buffer,
        contentType: String
    },
    name:{
        type:String,
        required:true,
    },
    category:{
        type:Array,
    }
},
{timestamps:true})

module.exports = mongoose.model("Post",PostSchema)