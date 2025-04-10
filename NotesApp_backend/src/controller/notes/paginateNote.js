import notesSchema from "../../models/notesSchema.js";
import statusCode from "../../config/statusCodes.js";

export const paginateNote = async (req, res) => {
    try {
        const { userId } = req.body;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        //fetching notes with pagination 
        const response = await notesSchema.find({ userId: userId }).skip(skip).limit(limit)

        if (response.length > 0) {
            return res.status(statusCode.OK).json({
                success: true,
                message: "Notes fetched successfully",
                data: response
            })
        }
        else {
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "Notes not found"
            })
        }
    }
    catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "error occured" + error
        })
    }
}