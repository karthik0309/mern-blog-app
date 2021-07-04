const router= require("express").Router()
const {postCategory,getCategories} = require("../controllers/categories")

router.post("/",postCategory)
router.get("/",getCategories)

module.exports=router