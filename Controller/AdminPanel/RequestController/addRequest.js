import { Request } from "../../../models/AdminPanel/requests.model.js";
import memberValidationSchema from "../JoiSchema/memberValidation.js";

const addRequest = async (req, res) => {
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
      teams = [], // Array of objects { position, team, year }
    } = value;

    // Check if the request already exists based on name, emails, and rollNo
    const existingRequest = await Request.findOne({
      $or: [
        { emails: { $in: emails } }, // Match any email in the list
        { rollNo },                 // Match roll number
      ],
      firstName,
      lastName,
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Request to add request already exists",
        success: false,
      });
    }

    // Create a new request instance
    const newRequest = new Request({
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
      teams, // Add the team details
    });

    // Save the request to the database
    const savedRequest = await newRequest.save();

    // Respond with success and the saved request data
    res.status(201).json({
      message: "request added successfully",
      request: savedRequest,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to add request. Error: " + err.message,
      success: false,
    });
  }
};

export { addRequest };
