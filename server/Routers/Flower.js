import  {Router} from "express";
import {getAllFlowers,getFlowerById,deleteFlowerById,updateFlowerById,addFlower,getCountOfPages}
 from "../Controllers/Flower.js"
import {checkAdmin} from "../middlewares/validateToken.js";

//  הפנייה לפעולה המתאימה ע"פ סוג הבקשה
 const router = Router();
 router.get("/", getAllFlowers);
 router.get("/count", getCountOfPages);
 router.get("/:id", getFlowerById);
 router.delete("/:id",checkAdmin ,deleteFlowerById);
 router.put("/:id",checkAdmin, updateFlowerById);
 router.post("/",checkAdmin,addFlower);

 export default router;