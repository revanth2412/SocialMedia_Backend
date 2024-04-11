import mongoose from "mongoose";

export const userSchema=new mongoose.Schema({
    name:{type:String,
          required:true},
    email:{type:String,
           unique:true,
            required:true,
           match:[/.+\@.+\../,'Please enter a valid email']},
    password:{type:String,
              required:true},
    gender:{type:String,
            enum:['male','female'],
            required:true},
     loggedDevices:[{
                  type:String
     }]
})