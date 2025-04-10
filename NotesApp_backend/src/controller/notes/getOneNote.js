import statusCode from "../../config/statusCodes.js";
import notesSchema from "../../models/notesSchema.js";

export const getOneNote = async(req, res) => {
    try{
        const {id} = req.params;
        const {userId} = req.body;
        
        const note = await notesSchema.find({_id : id, userId : userId}).populate('userId');;

        if(note.length != 0){
            return res.status(statusCode.OK).json({
                success : true,
                message : "Note successfully fetched",
                data : note
            })
        }
        else {
            return res.status(statusCode.NOT_FOUND).json({
                success : false,
                message : "Note not found"
            })
        }
    }
    catch(error){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Error Occured: "+ error
        })
    }
}