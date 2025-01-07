import pkg from 'mongoose';
const {Schema, model, models } = pkg;
// Members Schema
const requestSchema = new Schema({
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
  status:  { type: String , default: "Pending" },
  teams:[{
    position: { type: String, required: true },
    team: { type: String, required: true }, 
    year: { type: Number, required: true }
  }],
  comments: [{
    name: { type: String, required: true },
    comment: { type: String, required: true }
  }],
});
//Export the model
export const Request = models.Requests || model('Requests', requestSchema);