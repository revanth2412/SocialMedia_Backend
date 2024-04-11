import express from "express";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import userRouter from "./src/features/users/user.routes.js";
import cookieParser from "cookie-parser";
import postRouter from "./src/features/posts/posts.routes.js";
import commentRouter from "./src/features/comments/comments.routes.js";
import likeRouter from "./src/features/likes/likes.routes.js";
import otpRouter from "./src/features/otp/otp.routes.js";


//server creation
const server=express();

server.use(cookieParser());
server.use(express.json())
server.get('/',(req,res)=>{
    res.send('welcome to social media API');
})
server.use('/api/users',userRouter)
server.use('/api/posts',postRouter);
server.use('/api/comments',commentRouter);
server.use('/api/likes',likeRouter);
server.use('/api/otp',otpRouter);

server.listen(3000,()=>{
    console.log('Server is up and running at 3000');
    connectUsingMongoose();
})