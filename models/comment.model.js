const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const commentSchema = mongoose.Schema({
    body:String,
    replies:[{type:ObjectId,ref:"comments"}],
    time:{type:Number,default:Date.now()},
    author:{type:String, required:true},
    parent:{type:String,default:null}
})
const Comment  = mongoose.model("comment",commentSchema);
module.exports = {Comment}  