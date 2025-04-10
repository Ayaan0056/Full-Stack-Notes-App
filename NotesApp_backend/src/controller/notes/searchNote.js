import notesSchema from "../../models/notesSchema.js";
import statusCode from "../../config/statusCodes.js";

export const searchNote = async (req, res) => {
    try {
        const { userId } = req.body;
        const { searchText } = req.body;

        if (!userId || !searchText) {
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "UserId or search text not found",
            });
        }

        const response = await notesSchema.find({
            userId: userId,
            title: { $regex: searchText, $options: "i" },
        });

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
                message: "No notes found.",
            });
        }
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error occured: " + error,
        });
    }
};
