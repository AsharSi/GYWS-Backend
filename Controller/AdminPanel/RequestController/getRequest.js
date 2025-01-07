import { Request } from "../../../models/AdminPanel/requests.model.js";

const getAllRequests = async (req, res) => {
    try{
        const requests = await Request.find();
        if(requests.length === 0){
            return res.status(404).json({
                message: "Requests not found",
                success: false,
            });
        }
        // filter the requests based on the status
        const filteredRequests = requests.filter(request => request.status === "Pending" || request.status === "Commented");
        if(filteredRequests.length === 0){
            return res.status(404).json({
                message: "Requests not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Requests found",
            success: true,
            filteredRequests,
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: `Internal server error${err.message}`,
            success: false,
        });
    }
}

const getMyRequests = async (req, res) => {
    try{
        console.log(req.body);
        const requests = await Request.find({appliedBy : req.body.email});
        if(requests.length === 0){
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


export {getAllRequests, getMyRequests};