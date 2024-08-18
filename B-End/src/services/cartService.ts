import { ObjectId } from "mongoose";
import { cartModel } from "../models/cartModel";
import productModle from "../models/productModel";

interface CreateCartForUser{
    userId:string;
}
const createCartForUser = async ({userId}:CreateCartForUser)=>{
    const cart = await cartModel.create({userId,totalAmount:0});
    await cart.save();
    return cart;


}
interface  GetActiveCartForUser{
    userId:string ;
}
export const getActiveCartForUser = async({
     userId,}: GetActiveCartForUser)=>{
    let cart = await cartModel.findOne({userId,status:"active"});
    if(!cart){
        cart = await createCartForUser({userId});

    }
    return cart;

};
interface AddItemToCart{
    productId:any;
    quantity:number;
    userId:string;
}


export const addItemToCart = async({productId,quantity,userId}:AddItemToCart)=>{
    const cart = await getActiveCartForUser({userId});
    const existsInCart = cart.items.find((p) =>p.product.toString() === productId);
    if( existsInCart){
        return{data:"item already exists in cart!",statusCode:400};
    }
    const product = await productModle.findById(productId);
    if(!product){
        return{data:"product not found",statusCode:400};
       
  }
    if(product.stock<quantity){
 return{data:"low stock for item",statusCode:400};
}

    cart.items.push({product:productId,unitPrice:product.price,quantity});
    cart.totalAmount+= product.price*quantity;
    const updateCart = await cart.save();

    return {data:updateCart , statusCode:200};

}