const router = require('express').Router()
const {
getPostById,
createPost,
getPost,
getAllPosts,
updatePost,
deletePost,
photo} = require('../controllers/posts')

router.param("postId",getPostById)

router.post("/create",createPost)
router.get("/:postId",getPost)
router.get("/photo/:postId",photo)
router.get("/",getAllPosts)
router.put("/update/:postId",updatePost)
router.delete("/delete/:postId",deletePost)

module.exports=router