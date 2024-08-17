
import  express, { request, response }  from "express";
import { register } from "../services/userService";

const router = express.Router();

router.post('/register',async(request,response)=>{
    const{firstName,lastName, email,password} = request.body;
    const {statusCode,data} = await register ({firstName,lastName,email,password});
    response.status(statusCode).send(data)

});




export default  router;