import { Member, Team } from "../../../models/AdminPanel/members.model.js";
import memberValidationSchema from "../JoiSchema/memberValidation.js";
import mongoose from "mongoose";

const addMember = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate request body
    const { error, value } = memberValidationSchema.validate(req.body);
    if (error) {
      res.status(500).json({
        message: "Failed to add member. Error: " + error,
        success: false,
      });
    }

    const {
      firstName,
      lastName,
      emails,
      imageUrls = [],
      phoneNumbers = [],
      facebookLink = "",
      linkedinLink = "",
      state = "",
      city = "",
      dateOfBirth,
      rollNo,
      teams = [], // Array of objects { position, team, year }
    } = value;

    // Create a new member instance
    const newMember = new Member({
      firstName,
      lastName,
      emails,
      imageUrls,
      phoneNumbers,
      facebookLink,
      linkedinLink,
      state,
      city,
      dateOfBirth,
      rollNo,
    });
    // Check if the member already exists by matching email, name, and roll number
    const existingMember = await Member.findOne({
      emails: { $in: emails },
      firstName,
      lastName,
      rollNo,
    });

    if (existingMember) {
      res.status(400).json({
      message: "Member already exists",
      success: false,
      });
      await session.abortTransaction();
      return;
    }

    // Save the member to the database
    const savedMember = await newMember.save({ session });

    // Add the member to the specified teams if any
    for (const teamData of teams) {
      const { position, team, year } = teamData;

      // Find the team by position, team, and year
      let matchedTeam = await Team.findOne({ position, team, year }).session(session);
      if (matchedTeam) {
        // Avoid duplicate member entries in the team
        if (!matchedTeam.members.includes(savedMember._id)) {
          matchedTeam.members.push(savedMember._id);
          await matchedTeam.save({ session });
        }
      } else {
        // Create a new team if it doesn't exist
        matchedTeam = new Team({ position, team, year, members: [savedMember._id] });
        await matchedTeam.save({ session });
      }
    }

    // Commit the transaction
    await session.commitTransaction();
    res.status(201).json({
      message: "Member added successfully",
      member: savedMember,
      success: true,
    });
  } catch (err) {
    // Rollback transaction on failure
    await session.abortTransaction();
    res.status(500).json({
      message: "Failed to add member. Error: " + err.message,
      success: false,
    });
  } finally {
    // End the session
    session.endSession();
  }
};

export { addMember };
