const express=require('express');
require('dotenv').config({debug:true});
const jwt=require('jsonwebtoken');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const dbConnection=require('./src/dbConfig/db.config.js');
const router=require('./src/routes/user.routes.js')



const server=express();

const PORT=process.env.PORT||5000
const corsOptions = {
    origin: 'https://main--assignmentfrontend123.netlify.app', // frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  };
  
  // Use CORS middleware with options
  server.use(cors(corsOptions));
  server.use(cookieParser());

server.use(express.json())
server.get("/",(req,res,next)=>{
    return res.status(200),send("welcome to express server!!!")
})
server.use("/api/v1/user",router);



server.listen(PORT,(req,res)=>{
    dbConnection();
    console.log(`server is listening at port ${PORT}`);
});
