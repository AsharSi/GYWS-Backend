import mongoose from "mongoose";
import { Member } from "../../../models/AdminPanel/members.model.js";

const getMemberById = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal server error: ${err.message}`,
      success: false,
    });
  }
};

const getMemberByYearPosTeam = async (req, res) => {
  try {
    const { year, position, team } = req.query;
    const query = {};

    if (year) query["teams.year"] = year;
    if (position)
      query["teams.position"] = { $regex: new RegExp(position, "i") };
    if (team) query["teams.team"] = { $regex: new RegExp(team, "i") };

    const members = await Member.find(query);

    if (!members) {
      return res.status(404).json({
        message: "Member not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Member found",
      success: true,
      members,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal server error: ${error.message}`,
      success: false,
    });
  }
};
const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    if (!members) {
      return res.status(404).json({
        message: "Members not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Members found",
      success: true,
      members,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal server error: ${error.message}`,
      success: false,
    });
  }
};

export { getMemberById, getMemberByYearPosTeam,getAllMembers};
