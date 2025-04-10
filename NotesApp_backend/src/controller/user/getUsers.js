import statusCode from "../../config/statusCodes.js";
import userSchema from "../../models/userSchema.js";

export const getUsers = async(req, res) => {
    try{
        const response = await userSchema.find({});

        if(response)
        {
            return res.status(statusCode.OK).json({
                success : true,
                message : "Users fetched successfully",
                data : response
            })
        }
        else
        {
            return res.status(statusCode.NOT_FOUND).json({
                success : false,
                message : "No users found"
            })
        }
    }
    catch(error)
    {
        console.log("Error occured: ", error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Error occured: ", error
        })
    }
}