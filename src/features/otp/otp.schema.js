import mongoose from "mongoose";

export const otpSchema=new mongoose.Schema({
    email:{
        type:String
    },
    otp:{
        type:String
    },
    resetpassword:{
        type:Boolean,
        default:false
    }
})