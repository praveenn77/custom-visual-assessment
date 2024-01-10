// Node URL Params
let url = require("url");

let address =
  "http://localhost:8080/default.htm?fromEmail=susikumar.pitchaimuthu@gmail.com&toEmail=susi1352748@gmail.com&description=Hello";
let urlParse = url.parse(address, true);

let data = urlParse.query;

// Node mailer

const nodemailer = require("nodemailer");

// Create a transporter using Gmail SMTP
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "susikumar.pitchaimuthu@gmail.com",
    pass: "plwe iuip ssea hztx",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Define email options
let mailOptions = {
  from: data.fromEmail,
  to: data.toEmail,
  subject: "Sending Email using Node.js",
  text: data.description,
};

// Send the email
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});
