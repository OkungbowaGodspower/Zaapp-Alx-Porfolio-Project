import React, { useState } from "react";

const SavingsGoal = ({ userId }) => {
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState("");
  const [saved, setSaved] = useState(0);

  const handleSetGoal = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: `Savings Goal: ${goal} - $${amount}`,
        userId,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then(() => {
        alert("Savings goal set successfully!");
        setSaved(0);
      });
  };

  const handleDeposit = () => {
    if (saved < amount) {
      setSaved(saved + 100);
      alert("Deposit added to savings goal!");
    } else {
      alert("Goal already achieved!");
    }
  };

  return (
    <div>
      <h4>Savings Goal</h4>
      <form>
        <div className="form-group">
          <label>Goal Name</label>
          <input
            type="text"
            className="form-control"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Goal Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSetGoal}
        >
          Set Goal
        </button>
      </form>
      <div className="mt-3">
        <h6>
          Progress: ${saved} of ${amount}
        </h6>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleDeposit}
        >
          Add $100 to Savings
        </button>
      </div>
    </div>
  );
};

export default SavingsGoal;
