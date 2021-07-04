const router=require('express').Router()
const {getUserById,getUser,updateUser,deleteUser} = require('../controllers/users')

router.param("userId",getUserById)
router.get("/get/:userId",getUser)
router.put("/update/:userId",updateUser)
router.delete("/delete/:userId",deleteUser)

module.exports = router
