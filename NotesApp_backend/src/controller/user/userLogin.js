import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import statusCode from "../../config/statusCodes.js";
import sessionSchema from "../../models/sessionSchema.js";
import userSchema from "../../models/userSchema.js";

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await userSchema.find({ email: email });

        
        if (response.length === 0) {
            return res.status(statusCode.BAD_REQUEST).json({
                success: false,
                message: "User  not found"
            });
        }

        const user = response[0]; 

        if (user.isVerified === false) {
            return res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: "Please complete email verification"
            });
        }

        const userId = user._id; 

        
        const data = await sessionSchema.find({ userId: userId });
        console.log("data: ", data);
        if (data.length > 0) {
            return res.status(statusCode.BAD_REQUEST).json({
                success: false,
                message: "Session is already active"
            });
        }

        
        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
            return res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized"
            });
        }

      
        const session = await sessionSchema.create({ userId: userId });

        
        const accessToken = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_TIME });
        const refreshToken = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: process.env.REFRESH_TOKEN_TIME });

        return res.status(statusCode.OK).json({
            success: true,
            message: "User  logged in successfully",
            accessToken: accessToken,
            refreshToken: refreshToken,
            data: {
                userId: userId,
                email: email
            }
        });
    } catch (error) {
        console.log("Error Occurred: ", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error Occurred: " + error
        });
    }
};