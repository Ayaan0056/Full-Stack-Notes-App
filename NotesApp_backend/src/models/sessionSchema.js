import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "userDb",
        required: true
    }
}, { timestamps: true });

export default mongoose.model("sessionDb", sessionSchema);