import React, { useState } from "react";
import "./App.css";
function App() {
  const [toUser, setToUser] = useState("");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = `http://localhost:8080/?to=${toUser}&text=${message}`;

    if (!emailSent) {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
        });

        if (response.ok) {
          console.log("GET request processed successfully.");
          setEmailSent(true);
          alert("Email sent successfully!");
        } else {
          console.error("Error processing GET request.");
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error("Error making GET request:", error.message);
        alert("Error making GET request: " + error.message);
      }
    } else {
      alert("Email already sent.");
    }
  };

  const handleReload = () => {
    setToUser("");
    setMessage("");
    setEmailSent(false);
  };

  return (
    <div className="container">
      {!emailSent && (
        <form onSubmit={handleSubmit}>
           <h2>Start sending Email! 😊</h2>
          <label>
            To User:
            <input
              type="text"
              value={toUser}
              onChange={(e) => setToUser(e.target.value)}
            />
          </label>
          <br />
          <label>
            Text Message:
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" disabled={emailSent}>
            {emailSent ? "Email Sent" : "Submit"}
          </button>
        </form>
      )}

      {emailSent && (
        <>
          
          <img
            src={
              "https://img.freepik.com/premium-vector/opened-envelope-document-with-green-check-mark-line-icon-official-confirmation-message-mail-sent-successfully-email-delivery-verification-email-flat-design-vector_662353-720.jpg?w=2000"
            }
            alt="Result Image"
          />
          <h2 className="result-good">Email has been sent! 😊</h2>
          <button className="reset" onClick={handleReload}>
            Reload
          </button>
        </>
      )}
    </div>
  );
}

export default App;
