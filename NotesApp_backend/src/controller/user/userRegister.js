import userSchema from "../../models/userSchema.js";
import statusCode from "../../config/statusCodes.js";
import { mailSender } from "./mailSender.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Check if user already exists
        const existingUser  = await userSchema.findOne({ email: email });
        if (existingUser ) {
            return res.status(statusCode.BAD_REQUEST).json({
                success: false,
                message: "User  already exists"
            });
        }

        // Hashing password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        const data = await userSchema.create({ userName, email, password: hashedPassword });

        // Generating token for email verification
        const token = jwt.sign({ userId: data._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.VERIFICATION_TOKEN_TIME,
        });

        // Prepare mail object
        const mailObject = {
            email,
            subject: "Email Verification",
            template: "email",
            context: {
                port: `${process.env.FRONTEND_PORT}`,
                token: token,
            },
        };

        // Send verification email
        await mailSender(mailObject);

        return res.status(statusCode.CREATED).json({
            success: true,
            data: data,
            message: "User  registered successfully. Please check your email for verification.",
        });
    } catch (error) {
        console.log("Error Occurred:", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error Occurred: " + error.message,
        });
    }
};