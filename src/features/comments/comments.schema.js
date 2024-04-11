import mongoose from "mongoose";

export const  commentSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})