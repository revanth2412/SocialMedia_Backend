import mongoose from "mongoose";
import { otpSchema } from "./otp.schema.js";

const otpModel=mongoose.model('Otp',otpSchema)
export class otpRepository{
    async saveotp(email,otp){
        try {
            const newotp=await otpModel.findOneAndUpdate({email:email},{
                otp:otp,
                resetpassword:false
            },{
                upsert:true,
                new:true
            })
            if(newotp){
                return newotp;
            }else{
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }


    }
    async verifyOtp(otp,email){
        try {
            const result=await otpModel.find({email:email,otp:otp});

            //console.log(result);
            if(result.length>0){
                await otpModel.findOneAndUpdate({_id:result[0]._id},{resetpassword:true});
                return true
            }
            else{
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }

    }
    async resetpasswordstatus(email){
        try {
            const result=await otpModel.find({email:email});
            return result;
        } catch (error) {
            console.log(error);
        }
   
    }
    async toggleresetstatus(email){
        try {
            const result=await otpModel.findOneAndUpdate({email:email},{resetpassword:false},{new:true});
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    
}