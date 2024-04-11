import { postSchema } from "./posts.schema.js";
import mongoose from "mongoose";
import {  ObjectId } from "mongodb";

const postModel=mongoose.model('Post',postSchema);

export default class postRepository{
    async addPosts(userId,imageUrl,caption){

        try {
            const newpost=new postModel({
                imageUrl:imageUrl,
                caption:caption,
                userId:userId
            })
           await newpost.save();
           return newpost;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async allPosts(){
        try {
            const allposts=await postModel.find();
            return allposts;

        } catch (error) {
            console.log(error);
            return false;
        }

    }

    async userPost(userId){
        try {
            const posts=await postModel.find({userId:userId})
            if(posts){
                return posts
            }else{
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async postById(postId,userId){
        try {
            const post=await postModel.find({userId:userId, _id:new ObjectId(postId)})
            if(post){
                return post
            }else{
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }

    }

    async deletePost(postId,userId){
        try {
            const deletedpost=await postModel.findOneAndDelete({userId:userId, _id:new ObjectId(postId)})
            if(deletedpost){
                return deletedpost;
            }else{
                return false
            }
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    async updatePost(postId,userId,imageUrl,caption){
        try {
            const post=await postModel.findOneAndUpdate({userId:userId, _id:new ObjectId(postId)},{
                imageUrl:imageUrl,
                caption:caption,
                userId:userId
            },{new:true})
            if(post){
                return post
            }else{
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }
}