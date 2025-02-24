import {flowerModel} from "../Models/Flower.js";

// פונקציית קבלת כל הפרחים
export const getAllFlowers = async (req, res) => {
    let limit = req.query.limit || 2;
    let page = req.query.page || 1;
    try {
        let data = await flowerModel.find().skip((page-1)*limit).limit(limit);
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "Error: cannot get all flowers", message: err.message })
    }
}

export const getCountOfPages= async(req,res)=>{
    let limit = req.query.limit|| 2;
    try{
        let result = await flowerModel.countDocuments();
        res.json({
            countOfFloewr:result,
            countOfPages: Math.ceil(result/limit),
            limit:limit
        })
    }
    catch (err) {
        return res.status(400).json({ title: "Error: cannot get countDocuments of flowers", message: err.message })
    }
}

// פונקציית קבלת פרח לפי קוד פרח
export const getFlowerById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await flowerModel.findById(id);
    //    בדיקה אם קיים פרח עם כזה קוד
        if (!data)
            return res.status(404).json({ title: "Error: cannot get flower by id", message: "There isnt a flower with such id" })
        res.json(data)
    }
    // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        res.status(400).json({ title: "Error: cannot get flower by id", message: err.message })
    }
}

// פונקציית הוספת פרח
export const addFlower = async (req, res) => {
    let { name, price, flowerContain } = req.body;
    // בדיקת מילוי שדות חובה
    if (!name || !price || !flowerContain || flowerContain.length == 0)
        return res.status(404).json({ title: "Missing required details", message: "name , price and flowerContain are required fileds" })
        // בדיקת ערכים תקינים
    if (price < 100 || name.length < 2)
        return res.status(404).json({ title: "Incorrect details ", message: "The price has to be over 100 and the name has to contain at least 2 letters" })
    try {
        let flower = new flowerModel(req.body)
        await flower.save()
        return res.json(flower)
    }
     // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        return res.status(400).json({ title: "Error: cannot add a flower", message: err.message })
    }
}

// פונקציית מחיקת פרח ע"י קוד פרח
export const deleteFlowerById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await flowerModel.findByIdAndDelete(id);
    //    בדיקה אם קיים פרח עם כזה קוד
        if (!data)
            return res.status(404).json({ title: "Error: cannot delete a flower", message: "no such id was found to be deleted" })
        res.json(data);
    }
     // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        return res.status(400).json({ title: "Error: cannot delete a flower", message: err.message })
    }
}

// פונקציית עדכון נתוני פרח ע"י קוד פרח
export const updateFlowerById = async (req, res) => {
    let { id } = req.params;
    let { name, price, flowerContain } = req.body;
    // בדיקת ערכים תקינים
    if (name && name.length < 2 || flowerContain && flowerContain.length == 0 || price && price < 100)
        return res.status(404).json({ title: "Incorrect details ", message: "The price has to be over 100 and the name has to contain at least 2 letters" })
    try {
        let dataF = await flowerModel.findByIdAndUpdate(id, req.body, { new: true });
          //    בדיקה אם קיים פרח עם כזה קוד
        if (!data)
            return res.status(404).json({ title: "Error: cannot update a flower", message: "no such id was found to be update" })
        res.json(data);
    }
     // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        return res.status(400).json({ title: "Error: cannot update a flower", message: err.message })
    }
}


