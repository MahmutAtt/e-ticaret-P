import userModel from "../models/userModel";

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
        return{data:"incorrect email or password!!",statusCode:400}
    }
    const newUser = new userModel({email,password,firstName,lastName})
    await newUser.save()
    return {data:newUser,statusCode:200};

}

//user login//
interface LoginParams{
    email:string;
    password:string;

}
export const Login = async({email,password}:LoginParams)=>{
    const findUser = await userModel.findOne({email})
    if(!findUser){
        return {error:{message:"incorrect email or password!!"}}
        
    }
    const passwordMatch = password === findUser.password;
    if(passwordMatch){
        return findUser;

    }
    return {error:{message:"incorrect email or password!!"}}
}