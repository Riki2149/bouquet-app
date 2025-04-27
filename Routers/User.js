import  {Router} from "express";
import {addUser,updatePasswordById,getUserById,getAllUsers,getUserByNameAndPassword,updateUserById}
from "../Controllers/User.js"
import { checkAdmin } from "../middlewares/validateToken.js";

 //  הפנייה לפעולה המתאימה ע"פ סוג הבקשה
 const router = Router();
 router.get("/",checkAdmin, getAllUsers);
 router.get("/:id",getUserById);
 router.put("/:id", updateUserById);
 router.put("/updatePassword/:id", updatePasswordById);
 router.post("/", addUser);
 router.post("/getUserByNameAndPassword/", getUserByNameAndPassword);

 export default router;