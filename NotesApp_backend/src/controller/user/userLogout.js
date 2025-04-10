import sessionSchema from "../../models/sessionSchema.js";
import statusCode from "../../config/statusCodes.js";

export const userLogout = async (req, res) => {
    try {
        const { userId } = req.body;
        const existingSession = await sessionSchema.find({userId});

        if (existingSession.length === 0) {
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "No user Found"
            })
        }

        const response = await sessionSchema.deleteMany({userId});

        if (response) {
            return res.status(statusCode.OK).json({
                success: true,
                message: "User logged out successfully"
            })
        }
    }
    catch (error) {
        console.log("Error occured");
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error Occured", error
        })
    }
}