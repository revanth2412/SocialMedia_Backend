
import jwt from "jsonwebtoken"
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController{
    constructor(){
        this.userRepository=new UserRepository();
    }
    async signUp(req,res,next){

        try {
            let {password}=req.body;
             password = await bcrypt.hash(password,12);
            const resp=await this.userRepository.signUp({...req.body,password})
            if(resp.success){
                res.status(200).json({
                    success:true,
                    msg:'user registration successful',
                    res:resp.res,
                });}
            else{
                res.status(400).json({
                    success:false,
                    msg:'user registration Unsuccessful',
                    res:resp.error,
                })
            }
            }
         catch (error) {
            console.log(error);
        }
    }
    async signIn(req,res,next){
        const resp=await this.userRepository.signIn(req.body);
        console.log(resp);
        if(resp.success){
            const token=jwt.sign({
                _id:resp.res._id,
            },
            '123',{
                expiresIn:'1h',
            });
            await this.userRepository.saveLogin(resp.res,token)
            res.clearCookie("jwtToken")
            res.cookie("jwtToken",token,{maxAge:1*60*60*1000, httpOnly: true})
            .json({
                success: true,
                msg:'user login successful',
                token
            })
        }else{
            res.send('error')
        }
    }
    async logOut(req,res,next){
        const resp=await this.userRepository.logout(req.cookies.jwtToken);
        res.clearCookie("jwtToken").json({"success":true, msg: "logout successful"})
    }
    async logOutAll(req,res,next){
        await this.userRepository.logoutAll();
        res.status(200).send('Logged out of all devices !')
    }
    async getUserDetails(req,res,next){
        const userId=req.params.userId;
        console.log(userId);
        const user=await this.userRepository.getUserDetails(userId);
        if(user){
            res.status(200).send(user);
        }
        else{
            res.status(400).send('user not found!')
        }
    }
    async getAllUserDetails(req,res,next){
        //const userId=req.params.userId;
        const users=await this.userRepository.getAllUserDetails();
        if(users){
            res.status(200).send(users);
        }
        else{
            res.status(400).send('users not found!')
        }
    }
    async updateUserDetails(req,res,next){
        const userId=req.params.userId;
        console.log(req.userId);
        if(userId == req.userId){

           const user= await this.userRepository.updateUserDetails(req.body,userId)
           console.log(user);
           if(user){
            res.status(200).send(user)
           }else{
            res.status(500).send('User details not updated! ')
           }
        }
    }

}