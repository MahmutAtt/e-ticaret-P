import { NextFunction,Response } from "express";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel";
import { ExtendRequest } from "../Types/extendedRequest";



const validateJWT = (req:ExtendRequest,res:Response,next:NextFunction)=>{
    const authorizationHeader = req.get('authorization');
    if(!authorizationHeader){
        res.status(403).send("Authorization header was not provided");
        return;


    }
    const token = authorizationHeader.split(" ")[1];
    if(!token){
        res.status(403).send("Bearer token not found");
        return;
    }
    jwt.verify(token,"KbcvL9MnbKby4N3tqnqbG7Btr", async (err,payload)=>{
        if(err){
            res.status(403).send("invalid token")
            return;
        }
        if(!payload){
            res.status(403).send("invalid token paylod")
            return;

        }
        const userpayload = payload as {
            email:string ; 
            firstName:string; 
            lastName:string;
        };
        const user =  await userModel.findOne({email: userpayload.email});
        req.user = user;
        next();

    });


}
export default validateJWT;