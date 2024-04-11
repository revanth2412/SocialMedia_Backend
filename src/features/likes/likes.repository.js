import mongoose from "mongoose";
import { likeSchema } from "./likes.schema.js";
import { ObjectId } from "mongodb";


const LikeModel = mongoose.model("Like", likeSchema)

export class LikeRepository{

    async getLikes( id){
        return await LikeModel.find({
            likeable: new ObjectId(id),
            on_model:'Post' || 'Comment'
        }).populate('User')
        .populate({path:'likeable', model: 'Post' || 'Comment'})
    }

    async likePost(userId, postId){
        try{
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable: new ObjectId(postId),
                on_model:'Post'
            });
            await newLike.save();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }

    async likeComment(userId, commentId){
        try{
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable: new ObjectId(commentId),
                on_model:'Comment'
            });
            await newLike.save();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }
}