import userModel from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//user register//
interface RegisterParams{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export const register = async({ firstName, lastName, email, password}:RegisterParams)=>{
    const findUser = await userModel.findOne({email})
    if(findUser){
        return{data:"User already exists!!",statusCode:400}
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new userModel({email,password:hashedPassword,firstName,lastName});
    await newUser.save();
    return {data:generatejwt({firstName,lastName,email}),statusCode:200};

}

//user login//
interface LoginParams{
    email:string;
    password:string;

}
export const Login = async({email,password}:LoginParams)=>{
    const findUser = await userModel.findOne({email})
    if(!findUser){
        return {data:"incorrect email or password!!",statusCode:400}
        
  }
    const passwordMatch = await bcrypt.compare(password,findUser.password);
    if(passwordMatch){
     return {
      data:generatejwt({
      email,
      firstName:findUser.firstName,
      lasteName:findUser.lastName
     }),
      statusCode:200
     };

 }
    return {data:"incorrect email or password!!",statusCode:400}
};
//generate JWT//

const generatejwt = (data:any)=>{
    return jwt.sign(data,'KbcvL9MnbKby4N3tqnqbG7Btr')
}