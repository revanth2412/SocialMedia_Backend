import commentRepository from "./comments.repository.js";

export default class commentController{
    constructor(){
        this.commentrepository=new commentRepository();
    }
    async GetAddComment(req,res,next){
        const userId=req.userId;
        const postId=req.params.postId;
        const {content}=req.body;
        const newcomment=await this.commentrepository.addComment(content,postId,userId)
        if(newcomment){
            res.status(200).send(newcomment)
        }else{
            res.status(400).send('Comment is not added!!')
        }
    }

    async getPostComments(req,res,next){
        const postId=req.params.postId;
        const postcomments=await this.commentrepository.postComments(postId);
        if(postcomments){
            res.status(200).send(postcomments)
        }else{
            res.status(404).send('comments not found!!')
        }
    }

    async getDeletedComment(req,res,next){
        const userId=req.userId;
        const commentId=req.params.commentId;
        const deletecomment=await this.commentrepository.deleteComment(commentId,userId);
        if(deletecomment){
            res.status(200).send(deletecomment)
        }else{
            res.status(404).send('comments could not be deleted!!')
        }
    }

    async getUpdateComment(req,res,next){
        const userId=req.userId;
        const commentId=req.params.commentId;
        const {content}=req.body
        const updatecomment=await this.commentrepository.updateComment(content,commentId,userId)
        if(updatecomment){
            res.status(200).send(updatecomment)
        }else{
            res.status(400).send('Comment is not updated!')
        }
    }
}