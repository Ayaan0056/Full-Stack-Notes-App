import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully Connected to MongoDB");
    } catch (error) {
        console.log("Error Occurred in DB Connection: ", error);
    }
};