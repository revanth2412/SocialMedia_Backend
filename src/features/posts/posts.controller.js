import postRepository from "./posts.repository.js";

export default class postController{
    constructor(){
        this.postrepository=new postRepository
    }
    async addUserPost(req,res,next){
        const userId=req.userId;
        const imageUrl=req.file.filename;
        const {caption}=req.body;
        const newpost=await this.postrepository.addPosts(userId,imageUrl,caption);
        if(newpost){
            res.status(200).send(newpost);
        }else{
            res.status(404).send('Post is not uploaded')
        }
    }

    async getAllPosts(req,res,next){
        const posts=await this.postrepository.allPosts();
        if(posts){
            res.status(200).send(posts)
        }
        else{
            res.status(404).send('posts not found!!')
        }
    }

    async getUserPosts(req,res,next){
        const userId=req.userId;
        const post=await this.postrepository.userPost(userId);
        if(post){
            res.status(200).send(post)
        }else{
            res.status(404).send('posts not found')
        }
    }

    async getPost(req,res,next){
        const userId=req.userId;
        const postId=req.params.postId;
        const post=await this.postrepository.postById(postId,userId)
        if(post){
            res.status(200).send(post)
        }else{
            res.status(404).send('posts not found')
        }
    }

    async getDeletePost(req,res,next){
        const userId=req.userId;
        const postId=req.params.postId;
        const deletepost=await this.postrepository.deletePost(postId,userId);
        if(deletepost){
            res.status(200).send(deletepost)
        }else{
            res.status(404).send('post cannot be deleted!!')
        }
    }

    async getUpdatePost(req,res,next){
        const userId=req.userId;
        const postId=req.params.postId;
        const imageUrl=req.file.filename;
        const {caption}=req.body;
        const updatepost=await this.postrepository.updatePost(postId,userId,imageUrl,caption);
        if(updatepost){
            res.status(200).send(updatepost)
        }else{
            res.status(500).send('post is not updated!!')
        }
    }
}