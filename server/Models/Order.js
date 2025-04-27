import { Schema, model ,Types} from "mongoose"

// סכמה מוקטנת של מוצר
const minimalFlowerSchema = Schema({
    _id: { type: Types.ObjectId, ref: "flower" },
    name: {type:String,required:true},
    price: {type:Number,required:true},
    qty: {type:Number,default:1}
})

// סכמת הזמנה
const orderSchema = Schema({
    OrdDate: { type: Date, default: new Date() },
    targetDate: Date,
    address: {type:String,required:true},
    userId: { type: Types.ObjectId, ref: "user",required:true },
    products: [{ type: [minimalFlowerSchema],required:true }],
    isSend: {type:Boolean,default:false},
    sendingPrice:{type:Number,default:100} ,
    finalPrice:Number
//     finalPrice: {
//         type: Number, default: function () {
//             let sum = 0;
//    //  מעבר על סכימת המוצרים וסכימת המחירים
//            this.products.map(flower => {
//                 sum += flower.price * flower.qty;
//             });
//    // הוספת תשלום המשלוח
//             return parseInt(sum+ this.sendingPrice);
//         }
//     }


})

export const orderModel = model("order", orderSchema);
