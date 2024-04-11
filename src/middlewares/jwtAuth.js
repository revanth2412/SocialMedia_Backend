import jwt from "jsonwebtoken";

export const auth=async(req,res,next) =>{
    const {jwtToken}=req.cookies;
    jwt.verify(jwtToken,"123",(err,data)=>{
        if(err){
            res.status(400).send("Unauthorized!!,  login to continue!")
        }
        else{
            req.userId=data._id;
            req.user=data.user;
            next();
        }
    })
}