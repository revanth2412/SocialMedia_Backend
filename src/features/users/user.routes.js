import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import UserController from "./user.controller.js";


const userRouter=express.Router();

const userController=new UserController();

userRouter.post('/signup',(req,res,next)=>{
    userController.signUp(req,res,next);
}),
userRouter.post('/signin',(req,res,next)=>{
    userController.signIn(req,res,next);
})
userRouter.get('/logout',(req,res,next)=>{
    userController.logOut(req,res,next);
})

userRouter.get('/logout-all-devices',(req,res,next)=>{
    userController.logOutAll(req,res,next);
})

userRouter.get('/get-details/:userId',(req,res,next)=>{
    userController.getUserDetails(req,res,next);
})

userRouter.get('/get-all-details',(req,res,next)=>{
    userController.getAllUserDetails(req,res,next);
})

userRouter.put('/update-details/:userId',auth,(req,res,next)=>{
    userController.updateUserDetails(req,res,next);
})

export default userRouter;

