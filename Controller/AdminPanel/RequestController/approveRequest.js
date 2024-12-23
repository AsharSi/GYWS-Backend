import { Request } from "../../../models/AdminPanel/requests.model.js";
import { Member } from "../../../models/AdminPanel/members.model.js";

const approveRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params._id);
    if (!request) {
      return res.status(404).json({
      message: `Request not found`,
      success: false,
      });
    }

    // Remove the request from the database
    await Request.findByIdAndDelete(req.params._id);
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
    } = request;
    // Check if the member already exists based on name, emails, and rollNo
    const existingMember = await Member.findOne({
      $or: [
        { emails: { $in: emails } }, // Match any email in the list
        { rollNo }, // Match roll number
      ],
      firstName,
      lastName,
    });

    if (existingMember) {
      return res.status(400).json({
        message: "Member already exists",
        success: false,
      });
    }

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
      teams, 
    });

    // Save the member to the database
    const savedMember = await newMember.save();

    // Respond with success and the saved member data
    res.status(201).json({
      message: "Member added successfully",
      member: savedMember,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Internal server error${err.message}`,
      success: false,
    });
  }
};
export { approveRequest };
