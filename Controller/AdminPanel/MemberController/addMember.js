import { Member } from "../../../models/AdminPanel/members.model.js";
import memberValidationSchema from "../JoiSchema/memberValidation.js";

const addMember = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = memberValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation failed. Error: " + error.details[0].message,
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
      position,
      year,
      teams = [], // Array of objects { position, team, year }
    } = value;

    // Check if the member already exists based on name, emails, and rollNo
    const existingMember = await Member.findOne({
      $or: [
        { emails: { $in: emails } }, // Match any email in the list
        { rollNo },                 // Match roll number
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
      position,
      year,
      teams, // Add the team details
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
    // Handle any errors during the process
    res.status(500).json({
      message: "Failed to add member. Error: " + err.message,
      success: false,
    });
  }
};

export { addMember };
