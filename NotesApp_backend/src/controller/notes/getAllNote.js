import notesSchema from "../../models/notesSchema.js";
import statusCode from "../../config/statusCodes.js";

export const getAllNote = async (req, res) => {
    try {
        const userId = req.body;

        const response = await notesSchema.find(userId);

        if (response.length === 0) {
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "No note found"
            })
        }
        else {
            return res.status(statusCode.OK).json({
                success: true,
                message: "Notes successfully fetched",
                data: response
            })
        }
    }
    catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error occured: " + error
        })
    }
}