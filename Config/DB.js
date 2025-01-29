import  mongoose from "mongoose";

// פונקציית התחברות למונגו אטלס
export const connectToDB = async () => {
    try{
        let connect = await mongoose.connect(process.env.DB_URI);
        console.log("mongo db connected");
    }
    catch(err){
        console.log("Login failed: "+err)
        process.exit(1)
    }
}




