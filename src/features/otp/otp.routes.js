import express from "express"

const otpRouter=express.Router();
import otpController from "./otp.controller.js";

const otpcontroller=new otpController();

otpRouter.post('/send',(req,res)=>{
    otpcontroller.sendOtp(req,res);
})
otpRouter.post('/verify',(req,res)=>{
    otpcontroller.verifyOtp(req,res);
})
otpRouter.post('/reset-password',(req,res)=>{
    otpcontroller.resetpassword(req,res);
})
export default otpRouter;