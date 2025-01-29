
import {Schema,model} from "mongoose"

// סכמת פרח
const flowerSchema = Schema({
   name : {type:String,required:true},
   description : String,
   price :{type:Number,required:true} ,
   flowerContain:{type:[String],required:true} ,
   img: String,
})

export const flowerModel = model("flower",flowerSchema);
