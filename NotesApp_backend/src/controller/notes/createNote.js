import statusCode from "../../config/statusCodes.js";
import noteSchema from "../../models/notesSchema.js"

export const createNote = async (req, res) => {
    try {
        const { userId, title, content } = req.body;

        const existingNote = await noteSchema.find({ userId: userId, title: title });

        if (existingNote.length != 0){
            return res.status(statusCode.FORBIDDEN).json({
                success: false,
                message: "Please use diffrernt note title"
            })
        }
        else {
            const newNote = (await noteSchema.create({userId: userId, title: title, content: content }));

            return res.status(statusCode.CREATED).json({
                success: true,
                message: "Note successfully created",
                data: newNote
            })
        }
    }
    catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error occured:", error
        })
    }
}