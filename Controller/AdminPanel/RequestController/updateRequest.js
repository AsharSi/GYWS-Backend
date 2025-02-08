import { Request } from "../../../models/AdminPanel/requests.model.js";
import memberValidationSchema from "../JoiSchema/memberValidation.js";

const updateRequest = async (req, res) => {
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
      appliedBy,
      teams = [], // Array of objects { position, team, year }
    } = value;
    const request = await Request.findOne({appliedBy: appliedBy});
if(!request) // return 400 if request does not exist 
{
    return res.status(400).json({
        message: "Request does not exist",
        success: false,
    });
}
const status = request.status;
if(status === "Denied" || status === "Accepted") // return 400 if request is denied
{
    return res.status(400).json({
        message: `Request is already ${status}`,
        success: false,
    });
}
// update the request 
request = {
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
    appliedBy,
    teams,
    status: "Pending",
};
await request.save();
return res.status(200).json({
    message: "Request updated successfully",
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

export { updateRequest };
