import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB Connection established!!!")
    } catch (err) {
        console.log("Error Connecting to DB ", err);
        process.exit(1);
    }
}