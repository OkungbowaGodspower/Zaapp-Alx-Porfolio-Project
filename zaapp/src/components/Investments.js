import React, { useState } from "react";

const Investments = ({ userId }) => {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [interest, setInterest] = useState(0);

  const handleInvest = () => {
    const interestRate =
      duration === "1 month" ? 0.01 : duration === "3 months" ? 0.03 : 0.05;
    const projectedInterest = amount * interestRate;

    setInterest(projectedInterest);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: `Investment: $${amount} for ${duration} - Interest: $${projectedInterest}`,
        userId,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then(() => {
        alert("Investment made successfully!");
      });
  };

  return (
    <div>
      <h4>Investments</h4>
      <form>
        <div className="form-group">
          <label>Investment Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <select
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          >
            <option value="">Select Duration</option>
            <option value="1 month">1 month</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
            <option value="1 year">1 year</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleInvest}
        >
          Invest
        </button>
      </form>
      {interest > 0 && (
        <div className="mt-3">
          <h6>Projected Interest: ${interest.toFixed(2)}</h6>
        </div>
      )}
    </div>
  );
};

export default Investments;
