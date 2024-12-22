import pkg from 'mongoose';
const {Schema, model, models } = pkg;
// Members Schema
const membersSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  emails: { type: [String], required: true },
  imageUrls: { type: [String], default: [] },
  phoneNumbers: { type: [String], default: [] },
  facebookLink: { type: String, default: "" },
  linkedinLink: { type: String, default: "" },
  state: { type: String, default: "" },
  city: { type: String, default: "" },
  dateOfBirth: { type: Date, default: "" },
  rollNo: { type: String, default: "" },
  // team: { type: [Schema.Types.ObjectId], ref: 'Team' } 
});

// Team Schema
const teamSchema = new Schema({
  position: { type: String, required: true },
  year: { type: String, required: true },
  team: { type: String, required: true },
  members: { type: [Schema.Types.ObjectId], ref: 'Member' } 
});

const Team = models.Team || model("Team", teamSchema);
const Member = models.Member || model("Member", membersSchema);

export { Team, Member };
