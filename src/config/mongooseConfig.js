import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();
const url=process.env.MONGODB || "0.0.0.0:27017";

export const connectUsingMongoose=async()=>{
    try {
        await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Mongodb connected using mongoose');

    } catch (error) {
        console.log('error while connecting to DB');
        console.log(error);
    }
}