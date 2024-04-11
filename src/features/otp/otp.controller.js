import nodemailer from "nodemailer";
import { otpRepository } from "./otp.repository.js";
import UserRepository from "../users/user.repository.js";

export default class otpController{
    constructor(){
        this.otprepository=new otpRepository();
        this.userrepository=new UserRepository();
    }
    async sendOtp(req,res){
        const {email}=req.body;
        const randomNumber = Math.floor(Math.random() * 10000);
        const paddedNumber = randomNumber.toString().padStart(4, '0');
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:"revanth.sharma5198@gmail.com",
                pass:'zcjpeingshztixgb'
            }
        })
        const mailoptions={
            from:'revanth.sharma5198@gmail.com',
            to:email,
            subject:'Password reset',
            text:paddedNumber
        }
        try {
             const otp= await this.otprepository.saveotp(email,paddedNumber);
             if(otp){
                const result=await transporter.sendMail(mailoptions);
                if(result){
                    res.status(200).send('Otp sent successfully')
                }
             }else{
                res.status(400).send('Something went wrong!')
             }
            

        } catch (error) {
            console.log(error);
        }
    }

    async verifyOtp(req,res,next){
        const {otp,email}=req.body;
        const verify=await this.otprepository.verifyOtp(otp,email);
        //console.log(verify);
        if(verify){
            res.status(200).send('Otp verified successfully')
        }else{
            res.status(404).send('Otp incorrect');
        }
    }
    async resetpassword(req,res){
        
        const {email,password}=req.body;
        const result=await this.otprepository.resetpasswordstatus(email);
       
        if(result.length>0){
        if(result[0].resetpassword){
            const resetpassword=await this.userrepository.resetpassword(email,password);
            
            if(resetpassword){
                
                await this.otprepository.toggleresetstatus(email);
                res.status(200).send('Password reset successful')
            }else{
                res.status(200).send('password reset unsuccessful')
            }
        }else{
            res.status(400).send('otp verification required!')
        }}else{
            res.status(404).send('email not found ')
        }
    }
}