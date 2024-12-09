import pkg from "mongoose";
const { Schema: _Schema, model, models } = pkg;

const requestSchema = new _Schema({
    _id: { type: String }, // Use member_id as the default _id
    firstName: { type: String, required: true },
    lastName: {type: String},
    emails: { type: [String], required: true },
    imageUrls: { type: [String], default: [] },
    phoneNumbers: { type: [String], default: [] },
    facebookLink: { type: String, default: "" },
    linkedinLink: { type: String, default: "" },
    state: { type: String, default: "" },
    city: { type: String, default: "" },
    dateOfBirth: { type: Date,default: "" },
    rollNo: { type: String, default: "" },
    teams: [
      {
        teamAndpos: [
          {
            team: String,
            pos: String,
            position: String,
          },
        ],
        year: {
          type: Number, 
          ref: 'Years',
        },
      },
    ],
  },{_id:false});

  export default model('Request', requestSchema);