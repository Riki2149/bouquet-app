import { userModel } from "../Models/User.js";

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// פונקציית קבלת כל המשתמשים
export const getAllUsers = async (req, res) => {
    try {
        // שליפת הנתונים ללא הסיסמא של המשתמש
        let data = await userModel.find({}, "-password");
        res.json(data);
    }
    // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        return res.status(400).json({ title: "Error: cannot get all users", message: err.message })

    }
}

// פונקציית הוספת משתמש
export const addUser = async (req, res) => {
    let { userName, password, email } = req.body;
    // בדיקת מילוי שדות חובה
    if (!userName || !password)
        return res.status(404).json({ title: "Missing required details", message: "userName  and passward are required fileds" })
    // בדיקת ערכים תקינים
    if ((email && !emailRegex.test(email)) || !strongPasswordRegex.test(password) || userName.length < 2)
        return res.status(404).json({ title: "Incorrect details ", message: "The username must contain at least 2 letters, the password must be strong, and the email must be in the correct format." })


    try {
        let user = new userModel(req.body)
        await user.save()
        // שליפת הנתונים ללא הסיסמא של המשתמש
        let { password, ...details } = user.toObject();
        return res.json(details);

    }
    // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        return res.status(400).json({ title: "Error: cannot add a user", message: err.message })
    }
}

// פונקציית קבלת משתמש ע"י קוד משתמש 
export const getUserById = async (req, res) => {
    let { id } = req.params;
    try {
        // שליפת הנתונים ללא הסיסמא של המשתמש
        let data = await userModel.findById(id, "-password");
        //    בדיקה אם קיים משתמש עם כזה קוד
        if (!data)
            return res.status(404).json({ title: "Error: cannot get user by id", message: "There isnt a user with such id" })
        res.json(data)
    }
    // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        res.status(400).json({ title: "Error: cannot get user by id", message: err.message })
    }
}

// פונקציית עדכון משתמש ע"י קוד משתמש
export const updateUserById = async (req, res) => {
    let { id } = req.params;
    let { password, ...details } = req.body;
    // בדיקה אם הוקש סיסמא (בפעולה זו אין אפשרות לעדכן סיסמא)
    if (password)
        return res.status(404).json({ title: "Incorrect detail", message: "It is not possible to change the password in this operation " })
    // בדיקת ערכים תקינים
    if ((details.userName && details.userName.length < 2) || (details.email && !details.emailRegex.test(email)))
        return res.status(404).json({ title: "Incorrect details", message: "he username must contain at least 2 letters and the email must be in the correct format" })
    try {
        // שליפת הנתונים ללא הסיסמא של המשתמש
        let data = await userModel.findByIdAndUpdate(id, details, { new: true, fields: "-password" },);
        //    בדיקה אם קיים משתמש עם כזה קוד
        if (!data)
            return res.status(404).json({ title: "Error: cannot update a user", message: "no such id was found to be update" })
        res.json(data);
    }
    // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        return res.status(400).json({ title: "Error: cannot update a user", message: err.message })
    }
}

// פונקציית עדכון סיסמת משתמש ע"י קוד משתשמש
export const updatePasswordById = async (req, res) => {
    let { id } = req.params;
    let { password } = req.body;
    // בדיקת ערכים תקינים
    if (password && !strongPasswordRegex.test(password))
        return res.status(404).json({ title: "Incorrect detail ", message: "The passward must be strong" })
    try {
        // שליפת הנתונים ללא הסיסמא של המשתמש
        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true, fields: "-password" });
        //    בדיקה אם קיים משתמש עם כזה קוד
        if (!data)
            return res.status(404).json({ title: "Error: cannot update password in user", message: "no such id was found to be update" })
        res.json(data);
    }
    // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        return res.status(400).json({ title: "Error: cannot update password in user", message: err.message })
    }
}

// קבלת משתמש ע"י שם וסיסמא
export const getUserByNameAndPassword = async (req, res) => {
    let { userName, password } = req.body;
    try {
        let data = await userModel.findOne({ userName: userName });
        // בדיקה אם קיים משתמש אם שם כזה
        if (!data)
            return res.status(404).json({ title: "Error: cannot get user", message: "There is no user with such a name" });
        // בדיקה אם הסיסמא זהה  
            if (data.password != password)
            return res.status(401).json({ title: "Error: cannot get user by name and password", message: "There is no user with such a name and password" });
        let {password,...details} = data
        res.json(details);
    }
    // החזרת שגיאה עקב חוסר יכולת למלא את הבקשה
    catch (err) {
        return res.status(400).json({ title: "Error: cannot get user by name and password", message: err.message })
    }
}





