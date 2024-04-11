import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

import bcrypt from "bcrypt";

const UserModel=mongoose.model('User',userSchema)

export default class UserRepository{
    async signUp(user){
        try {
            const newUser=new UserModel(user);
            await newUser.save();
            return {success:true, res: newUser};
        } catch (error) {
            return {success:false, error:{statusCode: 400, msg: error}}
        }
    }
    async signIn(userdata){
        try {
            const {email,password}=userdata;
            //console.log('inside rep');
            const user=await UserModel.findOne({email});
            //console.log(user);
            if(!user){
                return {
                    success: false,
                    error: {
                        statusCode: 404,
                        msg:'user not found'
                    }
                }
            }else{
                let passwordValidation= await bcrypt.compare(password,user.password);
                if(passwordValidation){
                    return { success : true,
                             res: user}
                }else{
                    return {
                        success: false,
                        error:{
                            statusCode:400,
                            msg: 'invalid password'
                        }
                    }
                }
            }
        } catch (error) {
            return {
                success:false, 
                 error:{statusCode: 400, msg: error}}
        }
    }
    async saveLogin(user,token){
        try {
            const {email,password}=user;
            await UserModel.updateOne({email:email,password:password},
              { $push:{loggedDevices:token} })
              return true;
        } catch (error) {
            console.log(error);
            return false
        }
 
    }
    async logout(token ){
        try {
            await UserModel.updateMany({},{
                $pull:{loggedDevices:token}
            })
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async logoutAll(){
        try {
            await UserModel.updateMany({},{
                $set:{loggedDevices:[]}
            })
        } catch (error) {
            
        }
    }
    async getUserDetails(userId){
        try {
            const user=await UserModel.findById(userId,{password:0,loggedDevices:0})
            return user
        } catch (error) {
            console.log(error);
        }
    }
    async getAllUserDetails(userId){
        try {
            const user=await UserModel.find({},{password:0,loggedDevices:0})
            return user
        } catch (error) {
            console.log(error);
        }
    }
    async updateUserDetails(userData,userId){
        try {
            const {name,email,password,gender}=userData;
            const hashedpassword=await bcrypt.hash(password,12);
            const user=await UserModel.findOneAndUpdate({_id:userId},{
                name:name,
                email:email,
                password:hashedpassword,
                gender:gender
            },{new:true})
           // console.log(user);
            if(user){
                return user
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async resetpassword(email,password){
        try {
            const hashedpassword=await bcrypt.hash(password,12);
            const result=await UserModel.findOneAndUpdate({email:email},{password:hashedpassword},{new:true})
            
            return result
        } catch (error) {
            console.log(error);
            return false
        }

    }
}