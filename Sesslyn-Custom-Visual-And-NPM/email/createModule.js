const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs/promises");

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
        `\n${emailDetails.to} - ${
          emailDetails.text
        }`
      );
      console.log("File updated successfully.");
      return true;
    } else {
      console.log("No email details provided. File not updated.");
      return false;
    }
  } catch (err) {
    console.error(err);
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
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

http
  .createServer(async function (req, res) {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === "GET") {
      const emailDetails = {
        from: parsedUrl.query.email,
        to: parsedUrl.query.to,
        text: parsedUrl.query.text,
      };

      if (await fileOps(emailDetails)) {
        await sendEmail(emailDetails);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("GET request processed successfully.");
      }else{
        res.end("Start sending email. Nothing has been sent. ( http://localhost:8080/? +  to=recipient@gmail.com&text=message )");
      }
    } else if (req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", async () => {
        const emailDetails = JSON.parse(body);

        if (await fileOps(emailDetails)) {
          await sendEmail(emailDetails);
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Email sent and file updated successfully.");
        }else{
          res.end("Start sending email. Nothing has been sent. ( http://localhost:8080/? +  to=recipient@gmail.com&text=message )");
        }
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  })
  .listen(8080);

console.log("Server running on http://localhost:8080");
