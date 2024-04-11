import mongoose from "mongoose"

export const postSchema=new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})