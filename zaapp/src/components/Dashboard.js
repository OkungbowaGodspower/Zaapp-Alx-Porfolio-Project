import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid4 } from "uuid";
import Loader from "./Loader";
import {
  faUser,
  faPaperPlane,
  faPiggyBank,
  faHistory,
  faCog,
  faSignOutAlt,
  faUserCircle,
  faChartLine,
  faMoneyCheckAlt,
  faBars,
  faTimes,
  faEye,
  faEyeSlash,
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/dashboard.css";
import "../styles/dashQueries.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [transferAmount, setTransferAmount] = useState("");
  const [selectedFund, setSelectedFund] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("3");
  const [customYears, setCustomYears] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transferSuccessModalOpen, setTransferSuccessModalOpen] =
    useState(false);
  const [loanSuccessModalOpen, setLoanSuccessModalOpen] = useState(false);
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState(0);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [identifierType, setIdentifierType] = useState("email");
  const [receiverIdentifier, setReceiverIdentifier] = useState("");
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const [contributionAmount, setContributionAmount] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const navigate = useNavigate();

  // Close the sidebar in mobile view when an item is clicked
  const handleSidebarItemClick = (modalType) => {
    setActiveModal(modalType); // Set the active modal type
    setSidebarOpen(false); // Close sidebar in mobile view
  };

  // Close modal when clicking outside or pressing ESC
  const closeModal = () => {
    setShowModal(false);
    setActiveModal(null); // Clear active modal
    document.removeEventListener("keydown", handleEscKey); // Remove ESC listener
  };

  // Handle ESC key to close modal
  const handleEscKey = (e) => {
    if (e.key === "Escape") closeModal();
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Attach ESC key listener when a modal is open
  useEffect(() => {
    if (activeModal) {
      document.addEventListener("keydown", handleEscKey);
    } else {
      document.removeEventListener("keydown", handleEscKey);
    }
  }, [activeModal]);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const balanceValue = userData?.balance ? Number(userData.balance) : 0;
  const balanceString = balanceValue.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // const hiddenBalance = "*".repeat(balanceString.length);
  const hiddenBalance = "****";

  const formatNumber = (number) => {
    return number ? number.toLocaleString() : "0";
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "Loan":
        return <i className="fas fa-arrow-down" style={{ color: "blue" }}></i>;
      case "Investment":
        return <i className="fas fa-chart-line" style={{ color: "green" }}></i>;
      case "Transfer":
      case "Debit":
        return <i className="fas fa-exchange-alt" style={{ color: "red" }}></i>;
      case "Credit":
        return (
          <i className="fas fa-exchange-alt" style={{ color: "green" }}></i>
        );
      case "Save":
        return <i className="fas fa-bookmark"></i>;
      case "Withdraw":
        return <i className="fas fa-wallet"></i>;
      default:
        return <i className="fa fa-question-circle"></i>;
    }
  };

  // Load all necessary data on component mount
  useEffect(() => {
    const loadSessionData = () => {
      const sessionData = JSON.parse(localStorage.getItem("session")) || {};

      if (!sessionData.id) {
        console.error("No user ID found in session.");
        return navigate("/login");
      }

      const userDataFromStorage =
        JSON.parse(localStorage.getItem(`user-${sessionData.id}`)) ||
        sessionData;

      setUserData(userDataFromStorage);
      setUserName(userDataFromStorage.fullName || "");
      setUserEmail(userDataFromStorage.email || "");
      setUserInfo({ accountNumber: userDataFromStorage.accountNumber || "" });

      // Load Savings Goals
      const savedGoals =
        JSON.parse(localStorage.getItem(`savingsGoals-${sessionData.id}`)) ||
        [];
      setSavingsGoals(savedGoals);

      // Load Transactions
      const savedTransactions =
        JSON.parse(localStorage.getItem(`transactions-${sessionData.id}`)) ||
        [];
      setTransactions(savedTransactions);

      setIsLoading(false);
    };

    loadSessionData();
  }, [navigate]);

  const userId = userData?.id;

  const saveTransactionsToLocalStorage = (transactions) => {
    if (userData.id) {
      localStorage.setItem(
        `transactions-${userData.id}`,
        JSON.stringify(transactions)
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const handleAddGoal = (e) => {
    e.preventDefault();
    const newGoal = {
      id: uuid4(),
      name: goalName,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
    };

    const updatedGoals = [...savingsGoals, newGoal];
    setSavingsGoals(updatedGoals);

    // Persist goals
    localStorage.setItem(
      `savingsGoals-${userData.id}`,
      JSON.stringify(updatedGoals)
    );

    // Reset form inputs
    setGoalName("");
    setTargetAmount("");
  };

  const handleAddContribution = (goalId) => {
    setSelectedGoalId(goalId);
    setIsContributionModalOpen(true);
  };

  const handleLoanRequest = () => {
    const loanAmountValue = parseFloat(loanAmount);

    // Validate loan amount
    if (isNaN(loanAmountValue) || loanAmountValue <= 0) {
      setErrorMessage("Please enter a valid loan amount.");
      setErrorModalOpen(true);
      return;
    }

    const currentBalance = userData.balance;

    // Scenario 1: User already has more than ₦1,000,000
    if (currentBalance >= 1000000) {
      setErrorMessage(
        "You cannot borrow funds because your current balance is ₦1,000,000 or more."
      );
      setErrorModalOpen(true);
      return;
    }

    // Scenario 2: Adding the loan amount would exceed ₦1,000,000
    const potentialBalance = currentBalance + loanAmountValue;
    if (potentialBalance > 1000000) {
      setErrorMessage(
        "This loan amount would cause your balance to exceed ₦1,000,000, which is not allowed."
      );
      setErrorModalOpen(true);
      return;
    }

    // Update user's balance
    const newBalance = potentialBalance;
    const updatedUserData = { ...userData, balance: newBalance };
    setUserData(updatedUserData);

    // Save updated data in `user-{userId}` and `session`
    localStorage.setItem(
      `user-${userData.id}`,
      JSON.stringify(updatedUserData)
    );
    localStorage.setItem("session", JSON.stringify(updatedUserData));

    // Record loan transaction
    const newTransaction = {
      id: uuid4(),
      fullName: userData.fullName,
      date: new Date().toLocaleDateString(),
      type: "Loan",
      amount: `₦${loanAmountValue.toLocaleString()}`,
      description: "Loan Approved",
    };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    saveTransactionsToLocalStorage(updatedTransactions);

    // Clear loan amount input and show success modal
    setLoanAmount("");
    setLoanSuccessModalOpen(true);
  };

  const handleTransferFunds = (receiverIdentifier, amount) => {
    const transferAmount = parseFloat(amount);

    // Validate transfer amount
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setErrorMessage("Please enter a valid amount.");
      setErrorModalOpen(true);
      return;
    }

    // Check for sufficient balance
    if (transferAmount > userData.balance) {
      setErrorMessage("Insufficient balance for this transfer.");
      setErrorModalOpen(true);
      return;
    }

    // Determine receiver's storage key
    let receiverDataKey;
    if (receiverIdentifier.includes("@")) {
      receiverDataKey = Object.keys(localStorage).find((key) => {
        const user = JSON.parse(localStorage.getItem(key));
        return key.startsWith("user-") && user.email === receiverIdentifier;
      });
    } else {
      receiverDataKey = Object.keys(localStorage).find((key) => {
        const user = JSON.parse(localStorage.getItem(key));
        return (
          key.startsWith("user-") && user.accountNumber === receiverIdentifier
        );
      });
    }

    if (!receiverDataKey) {
      setErrorMessage(
        "Receiver not found. Please check the email or account number."
      );
      setErrorModalOpen(true);
      return;
    }

    const receiverData = JSON.parse(localStorage.getItem(receiverDataKey));

    // Update sender's balance
    const updatedSenderData = {
      ...userData,
      balance: userData.balance - transferAmount,
    };
    setUserData(updatedSenderData);
    localStorage.setItem(
      `user-${userData.id}`,
      JSON.stringify(updatedSenderData)
    );
    localStorage.setItem("session", JSON.stringify(updatedSenderData));

    // Update receiver's balance
    const updatedReceiverData = {
      ...receiverData,
      balance: (receiverData.balance || 0) + transferAmount,
    };
    localStorage.setItem(receiverDataKey, JSON.stringify(updatedReceiverData));

    // Record sender and receiver transactions
    const senderTransaction = {
      id: uuid4(),
      fullName: receiverData.fullName,
      type: "Debit",
      amount: `₦${formatNumber(transferAmount)}`,
      date: new Date().toLocaleDateString(),
      description: "Outgoing Transfer",
    };

    const receiverTransaction = {
      id: uuid4(),
      fullName: userData.fullName || "Unknown",
      type: "Credit",
      amount: `₦${formatNumber(transferAmount)}`,
      date: new Date().toLocaleDateString(),
      description: "Incoming Transfer",
    };

    const updatedSenderTransactions = [...transactions, senderTransaction];
    setTransactions(updatedSenderTransactions);
    saveTransactionsToLocalStorage(updatedSenderTransactions);

    const receiverTransactions =
      JSON.parse(localStorage.getItem(`transactions-${receiverData.id}`)) || [];
    receiverTransactions.push(receiverTransaction);
    localStorage.setItem(
      `transactions-${receiverData.id}`,
      JSON.stringify(receiverTransactions)
    );

    setTransferAmount("");
    setTransferSuccessModalOpen(true);
  };

  const handleInvest = () => {
    // Validate the investment amount
    if (
      !selectedFund ||
      !investmentAmount ||
      (selectedDuration === "custom" && !customYears)
    ) {
      setErrorMessage("Please complete all fields to proceed.");
      setErrorModalOpen(true);
      return;
    }

    const amount = parseFloat(investmentAmount);
    if (amount <= 0 || isNaN(amount)) {
      setErrorMessage("Please enter a valid investment amount.");
      setErrorModalOpen(true);
      return;
    }

    // Check if the user has sufficient balance for the investment
    if (amount > userData.balance) {
      setErrorMessage("Insufficient balance for this investment.");
      setErrorModalOpen(true);
      return;
    }

    // Calculate the estimated income based on fund percentage and duration
    const income = parseFloat(calculateEstimatedIncome());
    const newBalance = userData.balance + income; // Add the estimated income to the current balance

    // Update user's balance
    const updatedUserData = { ...userData, balance: newBalance };
    setUserData(updatedUserData);

    // Save updated data in `user-{userId}` and `session`
    localStorage.setItem(
      `user-${userData.id}`,
      JSON.stringify(updatedUserData)
    );
    localStorage.setItem("session", JSON.stringify(updatedUserData));

    // Save the updated balance separately in local storage
    localStorage.setItem(`balance-${userData.id}`, newBalance);

    // Record the investment transaction in local storage
    const newTransaction = {
      id: uuid4(),
      fullName: userData.fullName,
      date: new Date().toLocaleDateString(),
      type: "Investment",
      amount: `₦${income.toLocaleString()}`,
      description: `Investment in ${selectedFund}`,
    };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    saveTransactionsToLocalStorage(updatedTransactions);

    // Clear the investment fields and show the success modal
    setInvestmentAmount("");
    setSuccessModalOpen(true);
  };

  const handleContributionSubmit = (goalId) => {
    const contribution = parseFloat(contributionAmount);

    if (isNaN(contribution) || contribution > (userData?.balance || 0)) {
      setErrorMessage("Insufficient balance.");
      setErrorModalOpen(true);
      return;
    }

    // Update the selected goal
    const updatedGoals = savingsGoals.map((goal) => {
      if (goal.id === goalId) {
        return { ...goal, currentAmount: goal.currentAmount + contribution };
      }
      return goal;
    });
    setSavingsGoals(updatedGoals);
    localStorage.setItem(
      `savingsGoals-${userData.id}`,
      JSON.stringify(updatedGoals)
    );

    // Deduct contribution from user's balance
    const updatedUserData = {
      ...userData,
      balance: userData.balance - contribution,
    };
    setUserData(updatedUserData);
    localStorage.setItem(
      `user-${userData.id}`,
      JSON.stringify(updatedUserData)
    );
    localStorage.setItem("session", JSON.stringify(updatedUserData));

    // Record the transaction
    const goal = savingsGoals.find((goal) => goal.id === goalId);
    const newTransaction = {
      id: uuid4(),
      fullName: userData.fullName,
      type: "Save",
      amount: `₦${formatNumber(contribution)}`,
      date: new Date().toLocaleDateString(),
      description: `Deposit to ${goal.name}`,
    };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem(
      `transactions-${userData.id}`,
      JSON.stringify(updatedTransactions)
    );

    // Reset form and close modal
    setIsContributionModalOpen(false);
    setContributionAmount("");
  };

  const confirmWithdraw = () => {
    const goal = savingsGoals.find((goal) => goal.id === selectedGoalId);
    const amountToWithdraw = parseFloat(withdrawAmount) || goal.currentAmount;

    if (amountToWithdraw > goal.currentAmount) {
      setErrorMessage("Insufficient funds in the savings goal.");
      setErrorModalOpen(true);
      return;
    }

    // Update the selected goal
    const updatedGoals = savingsGoals.map((goal) => {
      if (goal.id === selectedGoalId) {
        return {
          ...goal,
          currentAmount: goal.currentAmount - amountToWithdraw,
        };
      }
      return goal;
    });
    setSavingsGoals(updatedGoals);
    localStorage.setItem(
      `savingsGoals-${userData.id}`,
      JSON.stringify(updatedGoals)
    );

    // Add the withdrawal to user's balance
    const updatedUserData = {
      ...userData,
      balance: userData.balance + amountToWithdraw,
    };
    setUserData(updatedUserData);
    localStorage.setItem(
      `user-${userData.id}`,
      JSON.stringify(updatedUserData)
    );
    localStorage.setItem("session", JSON.stringify(updatedUserData));

    // Record the transaction
    const newTransaction = {
      id: uuid4(),
      fullName: userData.fullName,
      type: "Withdraw",
      amount: `₦${formatNumber(amountToWithdraw)}`,
      date: new Date().toLocaleDateString(),
      description: `Withdrawn from ${goal.name}`,
    };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem(
      `transactions-${userData.id}`,
      JSON.stringify(updatedTransactions)
    );

    // Reset form and close modal
    setWithdrawAmount("");
    setWithdrawModalOpen(false);
    setModalMessage(
      `Successfully withdrew ₦${formatNumber(amountToWithdraw)} from ${
        goal.name
      }`
    );
  };

  // Define the handleWithdraw function to open the withdraw modal and set the selected goal ID
  const handleWithdraw = (goalId) => {
    setSelectedGoalId(goalId);
    setWithdrawModalOpen(true);
  };

  const handleDeleteGoal = (goalId) => {
    const goal = savingsGoals.find((goal) => goal.id === goalId);
    if (goal && goal.currentAmount === 0) {
      const updatedGoals = savingsGoals.filter((goal) => goal.id !== goalId);
      setSavingsGoals(updatedGoals);

      // Persist updated goals
      localStorage.setItem(
        `savingsGoals-${userData.id}`,
        JSON.stringify(updatedGoals)
      );
    } else {
      setErrorMessage("Goal cannot be deleted as it still has funds.");
      setErrorModalOpen(true);
    }
  };

  const calculateEstimatedIncome = () => {
    const fundPercentage =
      selectedFund === "Equity Funds"
        ? 5
        : selectedFund === "Money Market Funds"
        ? 7
        : selectedFund === "Bond Funds"
        ? 10
        : 0;

    const years =
      selectedDuration === "custom"
        ? parseFloat(customYears)
        : parseFloat(selectedDuration) / 12;
    const amount = parseFloat(investmentAmount);

    if (isNaN(amount) || isNaN(years)) return "0.00";

    const estimatedIncome = (amount * fundPercentage * years) / 100;
    return estimatedIncome.toFixed(2).toLocaleString("en-NG");
  };

  const saveUserInfo = () => {
    if (!userId) {
      console.error("No user ID available for saving.");
      return;
    }

    const updatedUserInfo = {
      ...userData,
      fullName: userName,
      email: userEmail,
    };

    // Check for duplicate email in localStorage
    const localStorageKeys = Object.keys(localStorage);
    const userKeys = localStorageKeys.filter(
      (key) => key.startsWith("user-") && key !== `user-${userId}`
    );

    const isEmailDuplicate = userKeys.some((key) => {
      const otherUser = JSON.parse(localStorage.getItem(key));
      return otherUser.email === userEmail;
    });

    if (isEmailDuplicate) {
      setErrorMessage("Email is already in use by another user.");
      setErrorModalOpen(true);
      return;
    }

    // Save updated user data in localStorage
    localStorage.setItem(`user-${userId}`, JSON.stringify(updatedUserInfo));
    localStorage.setItem("session", JSON.stringify(updatedUserInfo));

    setUserData(updatedUserInfo);

    // Show success modal
    setModalMessage("User information updated successfully!");
    setShowModal(true);
  };

  const logout = () => setIsLogoutModalOpen(true);
  const confirmLogout = () => {
    localStorage.removeItem("session");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
      </button>

      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
          <h5>{userData?.fullName || "Guest"}</h5>
          <p>Acc. No: {userData?.accountNumber || "N/A"}</p>
        </div>
        <ul className="sidebar-list">
          <li
            className="sidebar-item height"
            onClick={() => handleSidebarItemClick("accountInfo")}
          >
            <FontAwesomeIcon icon={faUser} className="fa-icon" />
            <span>Account Info</span>
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleSidebarItemClick("transfer")}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="fa-icon" />
            <span>Transfer Funds</span>
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleSidebarItemClick("savingsGoals")}
          >
            <FontAwesomeIcon icon={faPiggyBank} className="fa-icon" />
            <span>Savings Goals</span>
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleSidebarItemClick("transactionHistory")}
          >
            <FontAwesomeIcon icon={faHistory} className="fa-icon" />
            <span>Transaction History</span>
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleSidebarItemClick("settings")}
          >
            <FontAwesomeIcon icon={faCog} className="fa-icon" />
            <span>Settings</span>
          </li>
          <li className="sidebar-item below-sidebar" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="fa-icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <div className={`main-content ${sidebarOpen ? "overlay" : ""}`}>
        <div className={`main-content ${sidebarOpen ? "blurred" : ""}`}>
          <div className={`account-overview ${sidebarOpen ? "open" : ""}`}>
            <p className={`overview-text ${sidebarOpen ? "open" : ""}`}>
              Account Overview
            </p>
          </div>
          <div className="atm-card">
            <div className="card-content">
              <div className="flex-board">
                <div>
                  <h1>Hi, {userData?.fullName.split(" ")[0]}</h1>
                </div>
                <div className="dashboard-amount">
                  <p className="amount-card">
                    <span>Current balance</span>
                    <h3 className="balance">
                      <span>₦</span>
                      {balanceVisible ? balanceString : hiddenBalance}
                    </h3>
                  </p>
                  <button
                    className="eye-toggle"
                    onClick={() => setBalanceVisible(!balanceVisible)}
                  >
                    <FontAwesomeIcon
                      icon={balanceVisible ? faEyeSlash : faEye}
                      className="fa-icon eye-icon"
                    />
                  </button>
                </div>
              </div>
              <div className="balance-graph">
                <div className="scrollable-container ">
                  <div className="scrollable-chart">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart
                        data={transactions.map((transaction) => ({
                          ...transaction,
                          amount:
                            parseFloat(
                              transaction.amount.replace(/[^0-9.-]+/g, "")
                            ) || 0, // Remove non-numeric characters
                        }))}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stoke="none"
                          vertical={false} // Horizontal grid only
                        />

                        <XAxis
                          dataKey="date"
                          tick={{
                            fontSize: "12px",
                            fill: "#0a2e65",
                          }}
                          tickLine={false}
                          axisLine={{ stroke: "#ddd" }}
                        />

                        <YAxis
                          tick={{
                            fontSize: "10px",
                            fill: "#0a2e65",
                            fontWeight: "bold",
                          }}
                          tickFormatter={(value) =>
                            value > 0
                              ? `₦${value.toLocaleString("en-NG")}`
                              : "₦0"
                          }
                          tickLine={false}
                          axisLine={false}
                        />

                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            fontSize: "12px",
                          }}
                          formatter={(value) =>
                            value > 0
                              ? `₦${value.toLocaleString("en-NG")}`
                              : "₦0"
                          }
                        />

                        <Area
                          type="monotone"
                          dataKey="amount"
                          // stroke="#0066f5"
                          stroke="green"
                          fill="rgba(0, 102, 245, 0.5)"
                          strokeWidth={1}
                          dot={{
                            r: 4,
                            fill: "none",
                            stroke: "none",
                            strokeWidth: 1,
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>

          <div className="grid-layout">
            <div
              className="grid-item send"
              onClick={() => handleSidebarItemClick("transfer")}
            >
              <h3 className="icon">
                <FontAwesomeIcon icon={faPaperPlane} />
              </h3>
              <div>
                <h3>Transfer Funds</h3>
                <p>Send funds to other users.</p>
              </div>
            </div>

            <div
              className="grid-item loan"
              onClick={() => handleSidebarItemClick("loan")}
            >
              <div>
                <h3 className="icon">
                  <FontAwesomeIcon icon={faMoneyCheckAlt} />
                </h3>
              </div>
              <div>
                <h3>Request Loan</h3>
                <p>Fund your account.</p>
              </div>
            </div>

            <div
              className="grid-item invest"
              onClick={() => handleSidebarItemClick("invest")}
            >
              <div>
                <h3 className="icon">
                  <FontAwesomeIcon icon={faChartLine} />
                </h3>
              </div>
              <div>
                <h3>Invest In MF</h3>
                <p>Manage investments.</p>
              </div>
            </div>
          </div>

          <div className="recent-transactions">
            <h3>
              <FontAwesomeIcon icon={faHistory} /> Recent Transactions
            </h3>
            <div className="table-container">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Receiver's Name</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Transaction Reference</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions
                    .slice()
                    .reverse()
                    .map((transaction, index) => (
                      <tr key={`${transaction.id}-${index}`}>
                        <td>{getTransactionIcon(transaction.type)}</td>
                        <td>{transaction.fullName}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.type}</td>
                        <td>TRX{transaction.id}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.amount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Loan Request Modal */}

          {activeModal === "loan" && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Request a Loan</h2>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="Enter loan amount"
                />
                <div className="modal-buttons">
                  <button onClick={handleLoanRequest} className="apply-loan">
                    Apply
                  </button>
                  <button onClick={closeModal} className="cancel-loan">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Transfer Funds Modal */}
          {activeModal === "transfer" && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Transfer Funds</h2>
                <select
                  value={identifierType}
                  onChange={(e) => setIdentifierType(e.target.value)}
                  className="identifier-type-select custom-select"
                >
                  <option value="email">Email</option>
                  <option value="accountNumber">Account Number</option>
                </select>
                <input
                  type={identifierType === "email" ? "email" : "text"}
                  value={receiverIdentifier}
                  onChange={(e) => setReceiverIdentifier(e.target.value)}
                  placeholder={
                    identifierType === "email"
                      ? "Receiver's Email"
                      : "Receiver's Account No"
                  }
                  className="transfer-input"
                />
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Amount to Transfer"
                  className="transfer-input"
                />
                <div className="modal-buttons">
                  <button
                    onClick={() =>
                      handleTransferFunds(receiverIdentifier, transferAmount)
                    }
                    className="transfer-funds"
                  >
                    Transfer
                  </button>

                  <button onClick={closeModal} className="cancel-transfer">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Loan Success Modal */}
          {loanSuccessModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <FontAwesomeIcon
                  className="thumbs"
                  icon={faCheckCircle}
                  style={{ color: "green" }}
                  size="3x"
                />
                <h2>Loan Request Successful!</h2>
                <p className="text">
                  Your loan has been added to your balance.
                </p>
                <button
                  onClick={() => setLoanSuccessModalOpen(false)}
                  className="success-button"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {/* Investment Modal */}

          {activeModal === "invest" && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Invest in Mutual Funds</h2>
                <label htmlFor="mutualFund">Choose a Mutual Fund</label>
                <select
                  id="mutualFund"
                  className="custom-select"
                  value={selectedFund}
                  onChange={(e) => setSelectedFund(e.target.value)}
                >
                  <option value="">Select a fund</option>
                  <option value="Equity Funds">Equity Funds - 5% return</option>
                  <option value="Money Market Funds">
                    Money Market Funds - 7% return
                  </option>
                  <option value="Bond Funds">Bond Funds - 10% return</option>
                </select>
                <label htmlFor="duration">Investment Duration</label>
                <select
                  id="duration"
                  className="custom-select"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                >
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">1 Year</option>
                  <option value="custom">Custom Years</option>
                </select>
                {selectedDuration === "custom" && (
                  <input
                    type="number"
                    value={customYears}
                    onChange={(e) => setCustomYears(e.target.value)}
                    placeholder="Enter number of years"
                  />
                )}
                <label htmlFor="investmentAmount">Amount to Invest</label>
                <input
                  type="number"
                  id="investmentAmount"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder="Enter amount"
                />
                <p className="estimated-income text">
                  Estimated Income: ₦{calculateEstimatedIncome()}
                </p>
                <div className="modal-buttons">
                  <button onClick={handleInvest} className="apply-investment">
                    Invest
                  </button>
                  <button onClick={closeModal} className="cancel-investment">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Investment Success Modal */}
          {successModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <FontAwesomeIcon
                  className="thumbs"
                  icon={faCheckCircle}
                  style={{ color: "green" }}
                  size="3x"
                />
                <h2>Investment Successful!</h2>
                <p className="text">
                  Your estimated income has been added to your balance.
                </p>
                <div className="modal-buttons">
                  <button
                    onClick={() => setSuccessModalOpen(false)}
                    className="success-button"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Transfer Success Modal */}
          {transferSuccessModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <FontAwesomeIcon
                  className="thumbs"
                  icon={faCheckCircle}
                  size="3x"
                  style={{ color: "green" }}
                />
                <h2>Transfer Successful!</h2>
                <p className="text">
                  Your transfer has been completed successfully.
                </p>
                <div className="modal-buttons">
                  <button
                    onClick={() => setTransferSuccessModalOpen(false)}
                    className="success-button"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Account Information Modal */}
          {activeModal === "accountInfo" && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Account Information</h2>
                <p>
                  <strong>Full Name:</strong> {userData?.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {userData?.email}
                </p>
                <p>
                  <strong>Account Number:</strong> {userData?.accountNumber}
                </p>
                <p>
                  <strong>Balance:</strong> ₦
                  {(Number(userData?.balance) || 0).toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>

                <div className="modal-buttons">
                  <button onClick={closeModal} className="close-modal-button">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Transaction History Modal */}
          {activeModal === "transactionHistory" && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content modal-transaction"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Transaction History</h2>
                <div className="table-container">
                  <table className="transactions-table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Receiver's Name</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Transaction Reference</th>
                        <th>Description</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions
                        .slice()
                        .reverse()
                        .map((transaction) => (
                          <tr key={transaction.id}>
                            <td>{getTransactionIcon(transaction.type)}</td>
                            <td>{transaction.fullName}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.type}</td>
                            <td>TRX{transaction.id}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="modal-buttons">
                  <button onClick={closeModal} className="close-modal-button">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Savings Goals Modal */}
          {activeModal === "savingsGoals" && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content savings-goals-section"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Savings Goals</h2>
                <form onSubmit={handleAddGoal}>
                  <input
                    type="text"
                    placeholder="Goal Name"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Target Amount"
                    value={targetAmount === "" ? "" : targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    required
                  />
                  <div className="modal-buttons button-padding">
                    <button type="submit" className="add-goal">
                      Add Goal
                    </button>
                    <button onClick={closeModal} className="close-button">
                      Close
                    </button>
                  </div>
                </form>

                {/* List of Goals */}
                <div className="goals-list">
                  {savingsGoals.length > 0 ? (
                    savingsGoals.map((goal) => (
                      <div key={goal.id} className="goal-item">
                        <h3>{goal.name}</h3>
                        <p className="text">
                          Saved: ₦{formatNumber(goal.currentAmount)} of ₦
                          {formatNumber(goal.targetAmount)}
                        </p>
                        <p className="text">
                          Progress:{" "}
                          {(
                            (goal.currentAmount / goal.targetAmount) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                        <progress
                          className="progress-bar"
                          value={goal.currentAmount}
                          max={goal.targetAmount}
                        ></progress>
                        <button
                          className="add-funds"
                          onClick={() => handleAddContribution(goal.id)}
                        >
                          Add funds
                        </button>
                        {goal.currentAmount >= goal.targetAmount && (
                          <button
                            className="withdraw"
                            onClick={() => handleWithdraw(goal.id)}
                          >
                            Withdraw
                          </button>
                        )}
                        <button
                          className="delete-plan"
                          onClick={() => handleDeleteGoal(goal.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text">
                      No savings goals yet. Start adding goals!
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Contribution Modal */}
          {isContributionModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Add Funds to Goal</h2>
                <input
                  type="number"
                  value={contributionAmount}
                  onChange={(e) =>
                    setContributionAmount(parseFloat(e.target.value))
                  }
                  placeholder="Enter amount"
                  className="contribution-input"
                />
                <div className="modal-buttons">
                  <button
                    onClick={() => handleContributionSubmit(selectedGoalId)}
                    className="add-funds"
                  >
                    Add Funds
                  </button>
                  <button
                    onClick={() => setIsContributionModalOpen(false)}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Withdraw Modal */}
          {withdrawModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Withdraw Funds</h2>
                <p className="text">
                  Withdraw the full amount or specify a custom amount?
                </p>
                <input
                  type="number"
                  placeholder="Enter amount to withdraw"
                  value={withdrawAmount}
                  onChange={(e) =>
                    setWithdrawAmount(parseFloat(e.target.value))
                  }
                />
                <div className="modal-buttons">
                  <button
                    onClick={confirmWithdraw}
                    className="confirm-withdraw"
                  >
                    Confirm Withdraw
                  </button>
                  <button
                    onClick={() => setWithdrawModalOpen(false)}
                    className="cancel-withdraw"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Modal */}
          {activeModal === "settings" && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Edit User Info</h2>
                <div className="settings">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="settings">
                  <label>Email Address: </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                <div className="settings settings-more">
                  <label>Account No:</label>
                  <input
                    type="text"
                    value={userInfo.accountNumber || ""}
                    readOnly
                  />
                </div>
                <div className="settings settings-more">
                  <label>Balance:</label>

                  <input
                    type="text"
                    value={`₦${(Number(userData.balance) || 0).toLocaleString(
                      "en-NG",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}`}
                    readOnly
                  />
                </div>
                <div className="modal-buttons">
                  <button className="save-change" onClick={saveUserInfo}>
                    Save Changes
                  </button>
                  <button className="close-button" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Info Modal */}
          {isInfoModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Why is this balance limit in place?</h2>
                <p className="text">
                  You can't borrow more because your balance is above
                  ₦1,000,000, for security and regulatory reasons.
                </p>
                <div className="modal-buttons">
                  <button
                    className="close-modal-button"
                    onClick={() => setInfoModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Logout Confirmation Modal */}
          {isLogoutModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Confirm Logout</h2>
                <p className="text">Are you sure you want to log out?</p>
                <div className="modal-buttons">
                  <button onClick={confirmLogout} className="confirm-logout">
                    Yes, Log Out
                  </button>
                  <button
                    onClick={() => setIsLogoutModalOpen(false)}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Generic Modal */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="3x"
                  style={{ color: "green" }}
                />
                <h2>Success</h2>
                <p className="text">{modalMessage}</p>
                <div className="modal-buttons">
                  <button className="alert-modal" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {errorModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <FontAwesomeIcon
                  className="thumbs"
                  icon={faExclamationTriangle}
                  size="3x"
                  style={{ color: "red" }}
                />
                <h2>Error</h2>
                <p className="text">
                  {errorMessage.includes("₦1,000,000") && (
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        marginRight: "10px",
                        fontSize: "1.6rem",
                      }}
                      onClick={() => setShowInfoPopup(true)} // Show the info popup
                    />
                  )}
                  {errorMessage}
                </p>
                <div className="modal-buttons">
                  <button
                    className="alert-modal"
                    onClick={() => setErrorModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
              {/* Custom Popup Notification */}
              {showInfoPopup && (
                <div className="info-popup">
                  <p>
                    {errorMessage.includes("already has more than") &&
                      "Your current balance exceeds ₦1,000,000. Loans are not allowed in this case."}
                    {errorMessage.includes("would cause your balance") &&
                      "The requested loan would cause your balance to exceed ₦1,000,000, which is not allowed for regulatory and security reasons."}
                  </p>
                  <button
                    className="popup-close"
                    onClick={() => setShowInfoPopup(false)} // Hide the info popup
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;