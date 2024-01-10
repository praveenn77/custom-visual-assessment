const nodemailer = require('nodemailer');

// Create a transporter object
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Use 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'mathizan16@gmail.com', // Your Gmail address
    pass: 'fkpm khmd cpys ybqe' // Your Gmail password or an App Password
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Example email options
let mailOptions = {
  from: 'mathizan16@gmail.com',
  to: 'mathivananp@lumel.com',
  subject: 'Test Email',
  text: 'This is a test email from Node.js using Gmail SMTP'
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
