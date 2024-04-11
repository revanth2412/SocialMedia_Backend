import { LikeRepository } from "./likes.repository.js";


export class LikeController{

    constructor(){
        this.likeRepository = new LikeRepository();
    }

    async getLikes(req, res, next){
        try{
            const {id} = req.params.id;
           
            const likes = await this.likeRepository.getLikes(id);
            return res.status(200).send(likes)
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
    }

    async likeItem(req, res){
        try{
            const {id} = req.params.id;
            const {type}=req.query;
            if(type!='Post' && type!='Comment'){
                return res.status(400).send("Invalid");
            }
            if(type=='Product'){
                await this.likeRepository.likePost(req.userId, id);
            }else{
                await this.likeRepository.likeComment(req.userId, id);    
            }
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
          res.status(201).send();
    }
}