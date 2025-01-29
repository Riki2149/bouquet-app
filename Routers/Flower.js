import  {Router} from "express";
import {getAllFlowers,getFlowerById,deleteFlowerById,updateFlowerById,addFlower}
 from "../Controllers/Flower.js"

//  הפנייה לפעולה המתאימה ע"פ סוג הבקשה
 const router = Router();
 router.get("/", getAllFlowers);
 router.get("/:id", getFlowerById);
 router.delete("/:id", deleteFlowerById);
 router.put("/:id", updateFlowerById);
 router.post("/", addFlower);

 export default router;