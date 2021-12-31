const express= require('express');
require('dotenv').config();
require("./config/database").connect();
const userRoute=require('./api/routes/authentication.users.routes');
const adminRoute=require('./api/routes/authentication.admin.routes');


const app=express();
app.use(express.json());
app.use("/api/v1/users",userRoute);
app.use("/api/v1/admin",adminRoute);

app.use("*",(req,res)=> res.status(404).json({error:"page not found"}));

app.listen(process.env.SERVER_PORT||3001,()=> console.log("Server started"));