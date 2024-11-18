import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SendMoney = ({ userId }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    // Get the current user (sender) from session
    const sender = JSON.parse(localStorage.getItem("session"));

    if (!sender || sender.balance < parseFloat(amount)) {
      alert("Insufficient balance or user not logged in!");
      return;
    }

    // Check if the recipient exists by searching localStorage for the user with the entered account number
    const recipient = JSON.parse(localStorage.getItem("user"));

    if (recipient && recipient.accountNumber === parseInt(accountNumber)) {
      // Update balances
      sender.balance -= parseFloat(amount);
      recipient.balance += parseFloat(amount);

      // Update the user and session data in localStorage
      localStorage.setItem("user", JSON.stringify(recipient));
      localStorage.setItem("session", JSON.stringify(sender));

      // Simulate an API call to log the transaction
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: `Sent $${amount} to account ${accountNumber}`,
          userId,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then(() => {
          alert("Money sent successfully!");
          // Call navigate function to navigate to dashboard
          navigate("/dashboard");
        })
        .catch((error) => console.error("Error:", error));
    } else {
      alert("Recipient account not found!");
    }
  };

  return (
    <div>
      <h4>Send Money</h4>
      <form>
        <div className="form-group">
          <label>Recipient Account Number</label>
          <input
            type="text"
            className="form-control"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="button" className="btn btn-success" onClick={handleSend}>
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMoney;
