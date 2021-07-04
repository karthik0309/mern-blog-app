const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app=express()

//Middlewares
app.use(express.json());

//Routes
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const categoryRouter = require('./routes/categories')


//DB Connection
mongoose.connect(process.env.MONGO_URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("DB CONNECTED"))
.catch(err=>console.log(err))

//Routes
app.use("/api",authRouter)
app.use("/api",userRouter)
app.use("/api/post",postRouter)
app.use("/api/category",categoryRouter)

//PORTS
const PORT=process.env.PORT || 5000

//Listening to server
app.listen(PORT,()=>{
    console.log(`BACKEND RUNNING IN PORT ${PORT}`)
})