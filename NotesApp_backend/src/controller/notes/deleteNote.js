import notesSchema from "../../models/notesSchema.js";
import statusCode from "../../config/statusCodes.js";

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        console.log("userid: ", userId)
        const findNote = await notesSchema.findOne({ _id: id, userId: userId });
        console.log("findNote: ", findNote)
        if (!findNote) {
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "Note not found",
            })
        }
        else {
            const data = await notesSchema.deleteOne({ _id: id });
            if (data.deletedCount > 0) {
                return res.status(statusCode.OK).json({
                    success: true,
                    message: "Note deleted successfully",
                })
            }
            else {
                return res.status(statusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Note NOT deleted"
                })
            }
        }
    }
    catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error Occured: ", error
        })
    }
}