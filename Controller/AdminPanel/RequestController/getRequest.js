import { Request } from "../../../models/AdminPanel/requests.model.js";

const getAllRequests = async (req, res) => {
    try{
        const requests = await Request.find();
        if(!requests){
            return res.status(404).json({
                message: "Requests not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Requests found",
            success: true,
            requests,
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: `Internal server error${err.message}`,
            success: false,
        });
    }
}
export {getAllRequests};