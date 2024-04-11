import express from "express"
import { auth } from "../../middlewares/jwtAuth.js"
import postController from "./posts.controller.js";
import { uploadFile } from "../../middlewares/filehandler.middleware.js";

const postRouter=express.Router();

const postcontroller=new postController();

postRouter.post('/',auth,uploadFile.single('imageUrl'),(req,res,next)=>{
    postcontroller.addUserPost(req,res,next);
})

postRouter.get('/all',auth,(req,res,next)=>{
    postcontroller.getAllPosts(req,res,next);
})

postRouter.get('/',auth,(req,res,next)=>{
    postcontroller.getUserPosts(req,res,next);
})

postRouter.get('/:postId',auth,(req,res,next)=>{
    postcontroller.getPost(req,res,next);
})

postRouter.delete('/:postId',auth,(req,res,next)=>{
    postcontroller.getDeletePost(req,res,next);
})

postRouter.put('/:postId',auth,uploadFile.single('imageUrl'),(req,res,next)=>{
    postcontroller.getUpdatePost(req,res,next);
})

export default postRouter;