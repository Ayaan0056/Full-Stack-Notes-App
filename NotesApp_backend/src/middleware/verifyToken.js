import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";
import statusCode from "../config/statusCodes.js";

export const verifyToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        // console.log("authheader: ", authHeader);

        if (!authHeader) {
            return res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: "AuthHeader not found"
            })
        }
        else {
            const token = authHeader.split(" ")[1]
            // console.log("token:", token);

            if (!token) {
                return res.status(statusCode.UNAUTHORIZED).json({
                    success: false,
                    message: "Token not found"
                })
            }
            else {
                jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
                    if (error) {
                        return res.status(statusCode.UNAUTHORIZED).json({
                            success: false,
                            message: "Verification failed. The Link might have been expired"
                        })
                    }

                    const userId = decoded.userId;
                    const user = await userSchema.findById(userId);

                    if (user) {
                        user.isVerified = true
                        await user.save()

                        return res.status(statusCode.OK).json({
                            success: true,
                            message: "Email verification successfully completed"
                        })
                    }
                    else {
                        return res.status(statusCode.NOT_FOUND).json({
                            success: false,
                            message: "User email not found. Please register again"
                        })
                    }
                })
            }
        }
    }
    catch (error) {
        console.log("Error occured: ", error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error occured: ", error
        })
    }
}