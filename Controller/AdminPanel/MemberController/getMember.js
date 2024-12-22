import mongoose from "mongoose";
import { Member } from "../../../models/AdminPanel/members.model.js";

const getMemberById = async (req, res) => {
    try{
        const { _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({
                message: "Invalid member ID",
                success: false,
            });
        }

        const member = await Member.findById(_id);
        if (!member) {
            return res.status(404).json({
                message: "Member not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Member found",
            success: true,
            member,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `Internal server error: ${err.message}`,
            success: false,
        });
    }
}

export {getMemberById};
