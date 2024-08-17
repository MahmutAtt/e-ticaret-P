import express from "express";
import mongoose from "mongoose";
const app = express()
const port = 3001;



mongoose
.connect("mongodb://localhost:27017/ecommerce")
.then(() => console.log("mogo connected!"))
.catch((err)=> console.log("Failed to connect!",err));

app.listen(port,()=>{ 
    console.log("server is runninig at:http://localhost:3001")
})