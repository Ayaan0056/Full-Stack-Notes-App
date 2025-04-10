import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    token: {
        type: String,
    }
}, { timestsamps: true }); 

export default mongoose.model("userDb", userSchema)