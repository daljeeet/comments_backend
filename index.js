const express = require("express")
const { default: mongoose } = require("mongoose")
const commentRoute = require("./routes/comment.route")
const userRoute = require("./routes/user.route")
const authMiddleware = require("./middleware/authMiddleware")
const app = express()
require("dotenv").config()
app.use(express.json())

app.use("/user",userRoute)
app.use("/comment",authMiddleware)
app.use("/comment",commentRoute)



const port = process.env.PORT||5000
app.listen(port,async()=>{
    try{
        mongoose.connect(process.env.mongoUrl)
        console.log("server is connected to db and running")
    }catch(err){
        console.log(err)
    }
})