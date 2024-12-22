import { Member } from "../../../models/AdminPanel/members.model.js";


const editMember = async (req, res) => {
  try {
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
    } = req.body;

    // Find the member by ID 
    const memberId = req.params._id;
    const existingMember = await Member.findById(memberId);

    if (!existingMember) {
      return res.status(404).json({
        message: "Member not found",
        success: false,
      });
    }

    // Update member fields
    existingMember.firstName = firstName || existingMember.firstName;
    existingMember.lastName = lastName || existingMember.lastName;
    existingMember.emails = emails || existingMember.emails;
    existingMember.imageUrls = imageUrls || existingMember.imageUrls;
    existingMember.phoneNumbers = phoneNumbers || existingMember.phoneNumbers;
    existingMember.facebookLink = facebookLink || existingMember.facebookLink;
    existingMember.linkedinLink = linkedinLink || existingMember.linkedinLink;
    existingMember.state = state || existingMember.state;
    existingMember.city = city || existingMember.city;
    existingMember.dateOfBirth = dateOfBirth || existingMember.dateOfBirth;
    existingMember.rollNo = rollNo || existingMember.rollNo;
    existingMember.teams = teams.length > 0 ? teams : existingMember.teams;

    // Save updated member
    const updatedMember = await existingMember.save();

    // Respond with success and updated member data
    res.status(200).json({
      message: "Member updated successfully",
      member: updatedMember,
      success: true,
    });
  } catch (err) {
    // Handle any errors during the process
    res.status(500).json({
      message: "Failed to update member. Error: " + err.message,
      success: false,
    });
  }
};

export { editMember };
