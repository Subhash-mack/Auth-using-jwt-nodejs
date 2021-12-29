const express= require('express');
require('dotenv').config();
require("./config/database").connect();
const restaurants=require('./api/routes/authentication.routes')


const app=express();
app.use(express.json());
app.use("/api/v1/restaurants",restaurants)
app.use("*",(req,res)=> res.status(404).json({error:"page not found"}));

app.listen(process.env.SERVER_PORT||3001,()=> console.log("Server started"));