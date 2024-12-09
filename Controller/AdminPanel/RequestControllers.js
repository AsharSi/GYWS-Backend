import Request from "../../models/AdminPanel/requests.model.js";
import Member from "../../models/AdminPanel/members.model.js";
const addRequest = async (req, res) => {
  try {
    const {
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
    } = req.body;

    // Generate member_id from the name and the first email in the array
    const _id = `${firstName.toLowerCase().replace(/\s+/g, "")}-${emails[0]
      .toLowerCase()
      .replace(/\s+/g, "")}`;

    // Check if a member with the same member_id already exists
    const existingRequest = await Request.findOne({ _id });

    if (existingRequest) {
      // Update the existing member
      return res.status(400).json({ message: "Request already exists" });
    } else {
      // Create a new member
      const newRequest = new Request({
        _id,
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
      await newRequest.save();
    }

    res.status(200).json({ message: " Request added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding reqests " });
  }
};

async function getAllRequests(req, res) {
  try {
    const requests = await Request.find();
    res.status(200).json({ requests });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get requests", error: error.message });
  }
}

async function approveRequest(req, res) {
  
  try {
    const { _id } = req.params;
    const request = await Request.findById(_id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    const {
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
    } = request;
    // Check if a member with the same member_id already exists
    const existingMember = await Member.findOne({ _id });
    const deleted =await Request.findByIdAndDelete(_id);
    if (existingMember) {
      // Update the existing member
      return res.status(400).json({ message: "Member already exists" });
    } else {
      // Create a new member
      const newMember = new Member({
        _id,
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
      await newMember.save();
      res.status(200).json({ message: "Request approved successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to approve request", error: error.message });
  }
}

async function denyRequest (req,res){
    try{
        const {_id} = req.params;
        const deletedRequest= await Request.findByIdAndDelete(_id);
        if(!deletedRequest){
            return res.status(404).json({message:"Request not found"})
        }
        res.status(200).json({message:"Request denied successfully"});

    }
    catch(error){
        res
        .status(500)
        .json({message:"Internal Server Error",error: error.message});
    }
}

export { addRequest, getAllRequests, approveRequest,denyRequest };
