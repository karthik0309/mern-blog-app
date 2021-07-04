const router=require("express").Router()

const { check }=require("express-validator");
const {signUp,signIn}=require("../controllers/auth")

router.post("/signup",
[
    check("name","Name should be at least 3 char").isLength({min: 3}),
    check("email","Enter valid email").isEmail(),
    check("password","Password should be alphaNumeric").isAlphanumeric().isLength({min:4})
],
signUp)

router.post("/signin",
[
    check("email","Enter valid mail").isEmail(),
    check("password","").isLength({min:1})
]
,signIn)

module.exports = router;
