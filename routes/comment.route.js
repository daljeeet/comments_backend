const express =  require("express");
const { Comment } = require("../models/comment.model");
const commentRoute = express.Router();

commentRoute.post("/",async(req,res)=>{
    try{
        const {parent} = req.body;
        let newComment = new Comment(req.body);
        let data = await newComment.save();
        // if(parent){
        //     let parentComment = Comment.findOne({_id:parent});
        //     parentComment.replies.push(data._id);

        // }
        res.send(data)
    }catch(err){
        console.log(err)
        res.status(400).send({msg:'error'})
    }
})

commentRoute.get("/",async(req,res)=>{
    try{
        let data = await Comment.find();
        res.send(data)
    }catch(err){
        res.status(500).send({msg:"some error occored"})
    }
})

commentRoute.patch("/:_id",async(req,res)=>{
    try{
        console.log(req.params)
        await Comment.findByIdAndUpdate(req.params)
        res.send("successful")
    }catch(err){
        res.status(400).send({msg:"error while update"})
    }
})

module.exports = commentRoute;