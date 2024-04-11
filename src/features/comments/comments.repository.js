import mongoose, { isObjectIdOrHexString } from "mongoose";
import { commentSchema } from "./comments.schema.js";
import {  ObjectId } from "mongodb";


const commentModel=mongoose.model('Comment',commentSchema);

export default class commentRepository{

    async addComment(content,postId,userId){
        try {
            const comment=new commentModel({
                content:content,
                postId:postId,
                userId:userId
            });
            await comment.save();
            return comment;
        } catch (error) {
            console.log(error);
            return false
        }

    }

    async postComments(postId){
        try {
            const comment=await commentModel.find({postId:new ObjectId(postId)})
            if(comment){
                return comment
            }
            else{
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }

    }

    async deleteComment(commentId,userId){
        try {
            const deletedcomment=await commentModel.findOneAndDelete({userId:new ObjectId(userId),_id:new ObjectId(commentId)});
            if(deletedcomment){
                return deletedcomment
            }else{
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async updateComment(content,commentId,userId){

        try {
            const updateComment=await commentModel.findOneAndUpdate({userId:new ObjectId(userId),_id:new ObjectId(commentId)},{
                content:content
            },{
                new:true
            });
            if(updateComment){
                return updateComment
            }else{
                return false
            }
        } catch (error) {
            console.log(error);
            return false;
        }

    }
}