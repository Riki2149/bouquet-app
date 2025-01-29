import express from "express";
import {connectToDB} from "./Config/DB.js"
import flowerRouter from "./Routers/Flower.js"
import userRouter from "./Routers/User.js"
import orderRouter from "./Routers/Order.js"
import cors from "cors";
import {config} from "dotenv"



config()
// הפעלת פונקציית ההתחברות למונגו אטלס
connectToDB()

// שימוש בספריית express 
const app = express();
app.use(express.json());
app.use(cors()); 

// הפנייה ל-routers
app.use("/flowers",flowerRouter)
app.use("/users",userRouter)
app.use("/orders",orderRouter)

// הפעלת השרת
let port = process.env.PORT
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})