import  {Router} from "express";
import {getAllOrders,getOrderByUserId,updateOrderById,deleteOrderById,addOrder}
 from "../Controllers/Order.js"
import { checkAdmin, verifyToken } from "../middlewares/validateToken.js";

 //  הפנייה לפעולה המתאימה ע"פ סוג הבקשה
 const router = Router();
 router.get("/", getAllOrders);
 router.get("/:userId",getOrderByUserId);
 router.delete("/:id", deleteOrderById);
 router.put("/:id",checkAdmin, updateOrderById);
 router.post("/",verifyToken, addOrder);

 export default router;