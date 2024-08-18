
import  express, { request, response }  from "express";
import { Login, register } from "../services/userService";

const router = express.Router();

router.post('/register',async(request,response)=>{
    const{firstName,lastName, email,password} = request.body;
    const {statusCode,data} = await register ({firstName,lastName,email,password});
    response.status(statusCode).send(data)

});




router.post('/login',async(request,response)=>{
    const{email,password}=request.body;
    const{statusCode,data}=await Login({email,password})
    response.status(statusCode).send(data)
})
export default  router;