const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs/promises");
const cors = require("cors");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sesslyn2004@gmail.com",
    pass: "fbma bjch xzaz dkvk",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const fileOps = async (emailDetails) => {
  try {
    if (emailDetails.from || emailDetails.to || emailDetails.text) {
      await fs.appendFile(
        path.join(__dirname, "files", "emailSent.txt"),
        `\n${emailDetails.to} - ${emailDetails.text}`
      );
      console.log("File updated successfully.");
      return true;
    } else {
      console.log("No email details provided. File not updated.");
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

const sendEmail = async (emailDetails) => {
  const mailOptions = {
    from: "sesslyn2004@gmail.com",
    to: emailDetails.to,
    subject: "Sending Email using Node.js",
    text: emailDetails.text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

const resetState = () => {
  isEmailSent = false;
};

let isEmailSent = false;

http
  .createServer(async function (req, res) {
    cors()(req, res, () => {});

    const parsedUrl = url.parse(req.url, true);

    if (req.method === "GET") {
      const emailDetails = {
        from: parsedUrl.query.email,
        to: parsedUrl.query.to,
        text: parsedUrl.query.text,
      };

      resetState(); 

      if (!isEmailSent && (await fileOps(emailDetails))) {
        if (await sendEmail(emailDetails)) {
          isEmailSent = true;
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("GET request processed successfully. Email sent.");
        } else {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error sending email.");
        }
      } else {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Email already sent or missing details.");
      }
    } else if (req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", async () => {
        const emailDetails = JSON.parse(body);

        resetState(); 

        if (!isEmailSent && (await fileOps(emailDetails))) {
          if (await sendEmail(emailDetails)) {
            isEmailSent = true;
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Email sent and file updated successfully.");
          } else {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error sending email.");
          }
        } else {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Email already sent or missing details.");
        }
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  })
  .listen(8080);

console.log("Server running on http://localhost:8080");
