import notesSchema from "../../models/notesSchema.js";
import statusCode from "../../config/statusCodes.js";

export const sortNote = async (req, res) => {
    try {
        const {userId} = req.body;
        const sortCriteria = {
            [req.query.sortField]: req.query.sortOrder === "asc" ? 1 : -1,
        };

        const response = await notesSchema.find({ userId }).sort(sortCriteria);

        if (response.length > 0) {
            return res.status(statusCode.OK).json({
                success: true,
                message: "Notes sorted successfully",
                data: response,
            });
        }
        else {
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "Note not found",
            });
        }

    }
    catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "error occured" + error
        })
    }
}