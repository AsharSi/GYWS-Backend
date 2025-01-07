import { createTransport } from "nodemailer";

// Create a transporter object
let transporter = createTransport({
  service: "gmail",
  auth: {
    user: "harsagra3478@gmail.com", // your Gmail address
    pass: "guaf ioin cqiy wzog", // your Gmail password or app password
  },
});

// Email options
// Email options
const sendMailForComment = (email, name, message) => {
  let mailOptions = {
    
    from: {
        name: "GYWS - Admin",
        address: "harsagra3478@gmail.com", // your Gmail address
    },
    to: email,
    subject: `${name} commented on your request`,
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <div style="background-color: #f97316; padding: 4px; height: 40px; display: flex; align-items: center; justify-content: center;">

            <span style=" color: black; font-weight: 600; font-size: 18px;text-align: center;">
        <a href="admin.gyws.org" style="text-decoration: none; color: inherit;">Gopali Youth Welfare Society - Admin</a>
            </span>
        
      </div>
      <div style="padding: 16px;">
        <h1 style="font-size: 24px; font-weight: 600;">New Comment</h1>
        <p style="font-size: 20px; font-weight: 400;">${name}  -  ${message}</p>
      </div>
    </div>
  
    `,
  };
  try {
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error occurred: ", error);
      }
      console.log("Email sent: " + info.response);
    });
  } catch (error) {
    console.log(error);
  }
};

const sendMailForApprove = (email , name ) =>{
  let mailOptions = {
    
    from: {
        name: "GYWS - Admin",
        address: "harsagra3478@gmail.com", // your Gmail address
    },
    to: email,
    subject: `${name} approved your request`,
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <div style="background-color: #f97316; padding: 4px; height: 40px; display: flex; align-items: center; justify-content: center;">

            <span style=" color: black; font-weight: 600; font-size: 18px;text-align: center;">
        <a href="admin.gyws.org" style="text-decoration: none; color: inherit;">Gopali Youth Welfare Society - Admin</a>
            </span>
        
      </div>
      <div style="padding: 16px;">
        <h1 style="font-size: 24px; font-weight: 600;">Request Approved</h1>
        <p style="font-size: 20px; font-weight: 400;">Congrats your request for member details has been approved by ${name}</p>
      </div>
    </div>
  
    `,
  };
  try {
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error occurred: ", error);
      }
      console.log("Email sent: " + info.response);
    });
  } catch (error) {
    console.log(error);
  }
}

export { sendMailForApprove, sendMailForComment };