import statusCode from "../../config/statusCodes.js";
import notesSchema from "../../models/notesSchema.js";


export const updateNote = async (req, res) => {
    try {
        const {userId, title, content } = req.body;
        const { id } = req.params;

        const note = await notesSchema.findOne({ userId: userId, _id: id });

        if (!note) {
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "No note found"
            })
        }

        if (note.title !== title) {
            const existingNote = await notesSchema.findOne({ userId: userId, title: title })

            if (existingNote) {
                return res.status(statusCode.FORBIDDEN).json({
                    success: false,
                    message: "Note title must be unique"
                })
            }
        }

        note.title = title;
        note.content = content;
        await note.save();

        return res.status(statusCode.OK).json({
            success: true,
            message: "Note updated successfully.",
            data: note
        })
    }

    catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error occured: " + error
        })
    }
}