const Category=require("../models/Category")

exports.postCategory=async(req,res)=>{
    try{
        const newCategory=new Category(req.body)
        await newCategory.save()
        res.status(200).json(newCategory)
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getCategories=async(req,res)=>{
    try{
        const categories=await Category.find()
        res.status(200).json(categories)
    }catch(err){
        res.status(500).json(err)
    }
}
