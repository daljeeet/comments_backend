const express = require("express")
const User = require("../models/user.model")
const userRoute = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
userRoute.post("/register",async(req,res)=>{
    try{
        const {password,email} = req.body;
        let userExists = await User.findOne({email});
        if(!userExists){
            encPass = await  bcrypt.hash(password, 5);
            const data = {...req.body, password:encPass}
            let newUser = new User(data);
            await newUser.save();
            res.send({msg:"user Registred successfully"})
        }else{
            res.send({msg:"user with this email already exists"})
        }
    }catch(err){
        res.status(4000).send('wrong cread')
    }
})

userRoute.post("/login",async(req,res)=>{
    try{
        const {password, email} = req.body;
        let userExists = await User.findOne({email});
        if(userExists){
           const passCheck = await bcrypt.compare(password, userExists.password);
           if(passCheck){
            const token = jwt.sign({id:userExists._id},"shhhhh",{ expiresIn: 60 * 60 });
            console.log(token)
            res.send(token)
           }else{   
            res.status(400).send({msg:"invalid credintials"})
           }
        }else{
            res.status(400).send({msg:"invalid credintials"})
        }
    }catch(err){
        res.status(400).send({msg:err.message})
    }
})


module.exports = userRoute;