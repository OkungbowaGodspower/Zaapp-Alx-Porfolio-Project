import React from "react";

const TransactionHistory = ({ transactions }) => {
  return (
    <div>
      <h4>Transaction History</h4>
      <ul className="list-group">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="list-group-item">
            {transaction.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
