const jwt = require("jsonwebtoken")
const authMiddleware = async(req,res,next)=>{
    try{
        let token = req.headers.authorization.split(' ')[1];
        token = jwt.verify(token,"shhhhh");
        req.body={...req.body,author:token.id};
        next()
    }catch(err){
        res.status(401).send({msg:"unauthorized"})
    }
}
module.exports = authMiddleware;
