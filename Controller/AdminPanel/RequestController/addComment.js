import { Request } from "../../../models/AdminPanel/requests.model.js";
import { sendMail } from "../../sendMail.js";

const addComment = async (req, res) => {
    try {
        const { name , comment , id } = req.body;
        const request = await Request.findById(id);
        if (!request) {
            return res.status(404).json({
            message: `Request not found`,
            success: false,
            });
        }
        request.comments.push({name, comment});
        await request.save();
        sendMail(request.emails[0] , name , comment);
        return res.status(200).json({
            message: "Comment added successfully",
            success: true,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: `Internal server error${err.message}`,
            success: false,
        });
    }
}

export {addComment};
