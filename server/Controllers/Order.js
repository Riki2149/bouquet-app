import { orderModel } from "../Models/Order.js";

// פונקציית קבלת כל ההזמנות
export const getAllOrders = async (req, res) => {
    try {
        let data = await orderModel.find();
        res.json(data);
    }
    // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        return res.status(400).json({ title: "Error: cannot get all orders", message: err.message })
    }
}

// פונקציית הוספת הזמנה
export const addOrder = async (req, res) => {
    let { userId, products, address } = req.body;
    // בדיקת מילוי שדות חובה 
    if (!userId || !products || !address)
        return res.status(404).json({ title: "Missing required details", message: "userId , products and address are required fileds" })
    // בדיקת ערכים תקינים
    if (userId.length < 2 || address.length < 2 || products.length == 0)
        return res.status(404).json({ title: "Incorrect details ", message: "The useriId and the address has to contain at least 2 letters and the products has to contain at least 1 product" })
  
    let sum=0;
    products.forEach(flower => {
        sum += flower.price * flower.qty;
    });
    try {
        let data = new orderModel({...req.body,finalPrice:sum})
        await data.save()
        return res.json(data)
    }
    // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        return res.status(400).json({ title: "Error: cannot add an order", message: err.message })
    }
}

// פונקציית מחיקת הזמנה ע"י קוד הזמנה
export const deleteOrderById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await orderModel.findById(id);
        //    בדיקה אם קיימת הזמנה עם כזה קוד
        if (!data)
            return res.status(404).json({ title: "Error: cannot delete an order", message: "no such id was found to be deleted" })
        // בדיקה אם ההזמנה לא נשלחה כבר
        if (data.isSend)
            return res.status(404).json({ title: "Error: cannot delete an order", message: "It is not possible to delete an order that has started" })
        data = await orderModel.findByIdAndDelete(id);
        res.json(data);
    }
    // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        return res.status(400).json({ title: "Error: cannot delete an order", message: err.message })
    }
}

// פונקציית קבלת הזמנות ע"פ קוד משתמש
export const getOrderByUserId = async (req, res) => {
    let { userId } = req.params;
    try {
        let data = await orderModel.find({ userId });
        // בדיקה אם קיימות הזמנות ע"י המשתמש הזה
        if (!data || data.length == 0)
            return res.status(404).json({ title: "Error: cannot get orders by userId", message: "There isnt an order with such userId" })
        res.json(data)
    }
    // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        res.status(400).json({ title: "Error: cannot get aorders by userId", message: err.message })
    }
}

// פונקציית עדכון פרטי הזמנה ע"י קוד הזמנה
export const updateOrderById = async (req, res) => {
    let { id } = req.params;
    try {
    // עדכון שדה האם נשלח בהזמנה ל-true
        let data = await orderModel.findByIdAndUpdate(id, { isSend: true }, { new: true });
        //    בדיקה אם קיימת הזמנה עם כזה קוד
        if (!data)
            return res.status(404).json({ title: "Error: cannot update an order", message: "no such id was found to be update" })
        res.json(data);
    }
    // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        return res.status(400).json({ title: "Error: cannot update an order", message: err.message })
    }
}



