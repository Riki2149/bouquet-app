
import {Schema,model} from "mongoose"

// סכמת משתמש
const uaerSchema = Schema({
   userName : {type:String,required:true,unique:true},
   password : {type:String,required:true},
   email : {type:String,required:true},
   role:{type:String ,default:"User"} ,
   connectDate: {type:Date ,default:new Date()}
})

export const userModel = model("user",uaerSchema);
