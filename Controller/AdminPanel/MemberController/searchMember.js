import { Member } from "../../../models/AdminPanel/members.model.js";
const searchMember = async (req, res, next) => {
    try {
      const { searchString } = req.params; // Get the search string from request parameters
  
      // Define a regex to perform a case-insensitive search
      const regex = new RegExp(searchString, 'i');
  
      // Search in multiple fields using $or operator
      const members = await Member.find({
        $or: [
          { firstName: regex },
          {lastName: regex },
          { state: regex },
          { city: regex },
          { rollNo: regex }
        ]
      });
  
      // If no members are found, return a 404
      if (!members.length) {
        return res.status(404).json({ message: "No members found",success: false });
      }
  
      // Respond with the found members as an array
      res.status(200).json({ message: "Members found", success: true, members });
  
    } catch (err) {
      console.error("Error searching member:", err);
      res.status(500).json({ message:`Internal server error: ${err.message}`, success: false });
    }
  };
  export { searchMember };