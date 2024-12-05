import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const BalanceChart = ({ balanceHistory }) => {
  const data = {
    labels: balanceHistory.map((entry) => entry.date), // Dates or time periods
    datasets: [
      {
        label: "Balance Over Time",
        data: balanceHistory.map((entry) => entry.balance), // Balance values
        fill: false,
        backgroundColor: "#0066f5",
        borderColor: "#0066f5",
        tension: 0.1, // Makes the line smoother
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true, // Start Y-axis from zero
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default BalanceChart;
