import jwt from "jsonwebtoken"

import statusCode from "../config/statusCodes.js";
import sessionSchema from "../models/sessionSchema.js";
import userSchema from "../models/userSchema.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: "AuthHeader not found"
            })
        }
        else {
            const accessToken = authHeader.split(' ')[1]
            
            jwt.verify(accessToken, process.env.SECRET_KEY, async (error, decoded) => {
                if (error) {
                    return res.status(statusCode.UNAUTHORIZED).json({
                        success: false,
                        message: "User Unauthorized",
                        error: error
                    })
                }
                
                const userId = decoded.id;
                const findUser = await userSchema.findOne({ _id: userId })
                const isActive = await sessionSchema.findOne({ userId: userId });
               
                if (!findUser) {
                    return res.status(statusCode.UNAUTHORIZED).json({
                        success: false,
                        message: "Not a valid user"
                    })
                }
                else if (findUser.isVerified === false) {
                    return res.status(statusCode.FORBIDDEN).json({
                        success: false,
                        message: "Please Complete email verification"
                    })
                }
                else if (!isActive) {
                    return res.status(statusCode.FORBIDDEN).json({
                        success: false,
                        message: "User not logged in"
                    })
                }

                else{
                    req.body.userId = userId;
                    next();
                }
            })
        }
    }
    catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error Occured: ", error
        })
    }

}