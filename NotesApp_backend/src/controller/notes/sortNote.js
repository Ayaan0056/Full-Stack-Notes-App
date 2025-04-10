import notesSchema from "../../models/notesSchema.js";
import statusCode from "../../config/statusCodes.js";

export const sortNote = async (req, res) => {
    try {
        const validSortFields = ["title", "content", "createdAt"];
        const validSortOrder = ["asc", "desc"]
        const { userId } = req.body;
        const { sortField, sortOrder } = req.query;

        if (!validSortFields.includes(sortField)) {
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "Invalid sort field"
            });
        }

        if (!validSortOrder.includes(sortOrder)) {
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "Invalid sort order"
            });
        }

        const sortCriteria = { [sortField]: sortOrder === 'asc' ? 1 : -1 };

        const sortedData = await notesSchema.find({ userId: userId }).sort(sortCriteria);

        if (sortedData.length > 0) {
            return res.status(statusCode.OK).json({
                success: true,
                data: sortedData,
                message: "Data sorted and fetched successfully"
            });
        } else {
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "No data found"
            });
        }
    }
    catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: error.message,
            message: "Error occured"
        })
    }

}