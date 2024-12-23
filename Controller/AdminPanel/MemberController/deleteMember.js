import { Member } from "../../../models/AdminPanel/members.model.js";
import mongoose from "mongoose";

const deleteMember = async (req, res) => {
  try {
    const memberId = req.params._id;

    // Validate memberId
    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      return res.status(400).json({
        message: "Invalid Member ID",
        success: false,
      });
    }

    // Check if the member exists
    const existingMember = await Member.findById(memberId);
    if (!existingMember) {
      return res.status(404).json({
        message: "Member not found",
        success: false,
      });
    }

    // Delete the member
    const deletedMember = await Member.findByIdAndDelete(memberId);

    res.status(200).json({
      member: deletedMember,
      message: "Member deleted successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Internal server error: ${err.message}`,
      success: false,
    });
  }
};

export { deleteMember };
