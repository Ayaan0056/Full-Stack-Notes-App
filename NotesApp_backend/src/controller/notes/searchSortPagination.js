import notesSchema from "../../models/notesSchema.js";
import statusCode from "../../config/statusCodes.js";

export const searchSortPagination = async(req, res) => {
    try{
        const {userId, searchText} = req.body;
        const { sortField="title", sortOrder='asc', page=1, limit=5 } = req.query;

        if(!userId){
            return res.status(statusCode.NOT_FOUND).json({
                success : false,
                message : "user not found"
            })
        }

        //Building the query
        const query = {
            userId: userId,
            ...(searchText && { title: { $regex: searchText, $options: 'i' } }) 
        };

        const sortOptions = {};
        sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;

        const skip = (page - 1) * limit;
        const response = await notesSchema.find(query).sort(sortOptions).skip(skip).limit(limit);

        const totalNotes = await notesSchema.countDocuments(query);

        if(totalNotes > 0){
            return res.status(statusCode.OK).json({
                success : true,
                message : "Notes fetched successfully",
                response : response,
                totalPages : Math.ceil(totalNotes/limit),
                currentPage : page,
                totalNotes : totalNotes
            })
        }
        else {
            return res.status(statusCode.NOT_FOUND).json({
                success : false,
                message : "Notes not found"
            })
        }
        
    }catch(error){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success : false,
            error : error,
            message : "Error occured"
        })
    }
}