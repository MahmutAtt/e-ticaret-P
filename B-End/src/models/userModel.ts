import mongoose,{Schema,Document} from "mongoose";
//Kullanıcı Arayüzü (IUser) Tanımlaması:
export interface IUser extends Document{
    _id: string;
    
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}
// Kullanıcı Şeması (userSchema) Tanımlaması:
const userSchema = new Schema<IUser>({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},


})
 const userModel = mongoose.model<IUser>('User',userSchema);

 export default userModel;