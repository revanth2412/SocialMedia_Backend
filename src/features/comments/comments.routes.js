import commentController from "./comments.controller.js";
import express from "express"
import { auth } from "../../middlewares/jwtAuth.js";

const commentRouter=express.Router();
const commentcontroller=new commentController();

commentRouter.post('/:postId',auth,(req,res,next)=>{
    commentcontroller.GetAddComment(req,res,next);
})

commentRouter.get('/:postId',auth,(req,res,next)=>{
    commentcontroller.getPostComments(req,res,next);
})

commentRouter.delete('/:commentId',auth,(req,res,next)=>{
    commentcontroller.getDeletedComment(req,res,next);
})

commentRouter.put('/:commentId',auth,(req,res,next)=>{
    commentcontroller.getUpdateComment(req,res,next);
})

export default commentRouter;