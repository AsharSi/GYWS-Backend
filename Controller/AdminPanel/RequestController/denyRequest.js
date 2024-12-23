import { Request } from "../../../models/AdminPanel/requests.model.js";
import mongoose from "mongoose";
const denyRequest = async (req, res) => {
    try{
        const { _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({
                message: "Invalid request ID",
                success: false,
            });
        }
        const request = await Request.findById(_id);
        if (!request) {
            return res.status(404).json({
                message: "Request not found",
                success: false,
            });
        }
        await Request.findByIdAndDelete(_id);
        return res.status(200).json({
            message: "Request denied",
            success: true,
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: `Internal server error${err.message}`,
            success: false,
        });
    }
}
export {denyRequest};