import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userDb',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    file: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model("notesDB", notesSchema);