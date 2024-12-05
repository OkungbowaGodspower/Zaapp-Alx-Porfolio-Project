import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import html2canvas from "html2canvas";
import { v4 as uuid4 } from "uuid";
import Loader from "./Loader";
import {
  faUserCircle,
  faPaperPlane,
  faPiggyBank,
  faHistory,
  faCog,
  faSignOutAlt,
  faFrown,
  faSearch,
  faHandHoldingUsd,
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
import "../styles/dashqueries.css";
import bill1 from "../static/bills/electricity.png";
import bill2 from "../static/bills/internet.png";
import bill3 from "../static/bills/subscription.png";
import bill4 from "../static/bills/telephone.png";

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
  const [profileImage, setProfileImage] = useState(null);
  const [transferDescription, setTransferDescription] = useState("");
  const [activePage, setActivePage] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [billType, setBillType] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [billSuccessModalOpen, setBillSuccessModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loanBalance, setLoanBalance] = useState(0); // Track remaining loan
  const [repaymentAmount, setRepaymentAmount] = useState(""); // Repayment input
  const [isRepaymentModalOpen, setIsRepaymentModalOpen] = useState(false); // Modal control
  const [maxLoanAmount, setMaxLoanAmount] = useState(1000000);
  const [lastLoanAmount, setLastLoanAmount] = useState(0);
  const [repaymentSuccessModalOpen, setRepaymentSuccessModalOpen] =
    useState(false);
  const [lastRepaymentAmount, setLastRepaymentAmount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.id) {
      // Load the user's profile image from localStorage
      const savedImage = localStorage.getItem(`profileImage-${userData.id}`);
      if (savedImage) {
        setProfileImage(savedImage);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (userData && userData.id) {
      const storedLoanBalance = localStorage.getItem(
        `loanBalance-${userData.id}`
      );
      const storedMaxLoanAmount = localStorage.getItem(
        `maxLoanAmount-${userData.id}`
      );

      if (storedLoanBalance) {
        setLoanBalance(parseFloat(storedLoanBalance));
      }

      if (storedMaxLoanAmount) {
        setMaxLoanAmount(parseFloat(storedMaxLoanAmount));
      }
    }
  }, [userData]);

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfileImage(base64Image);

        // Save the image in localStorage with a user-specific key
        if (userData?.id) {
          localStorage.setItem(`profileImage-${userData.id}`, base64Image);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openReceipt = (transaction) => {
    setSelectedTransaction(transaction);
    setIsReceiptModalOpen(true);
  };
  const downloadReceipt = () => {
    const receiptElement = document.querySelector(".receipt-details");
    html2canvas(receiptElement).then((canvas) => {
      const link = document.createElement("a");
      link.download = `Receipt-${selectedTransaction.id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  const shareReceipt = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Transaction Receipt",
          recipient: `Recipient Name ${selectedTransaction.fullName}`,
          text: `Receipt for ${selectedTransaction.description} - ₦${selectedTransaction.amount}`,
          id: `Transaction ID ${selectedTransaction.id}`,
        })
        .catch((error) => console.error("Error sharing receipt:", error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  // Function to handle Escape key press
  const handleEscKey = useCallback((e) => {
    if (e.key === "Escape") {
      setShowModal(false);
      setActiveModal(null);
    }
  }, []);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.date.includes(searchQuery)
  );

  // Attach or remove the Escape key listener when the modal is active
  useEffect(() => {
    if (activeModal) {
      document.addEventListener("keydown", handleEscKey);
    } else {
      document.removeEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [activeModal, handleEscKey]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle sidebar item click
  const handleSidebarItemClick = (modalType) => {
    if (modalType === "logout") {
      logout();
    }
    if (modalType === "repayLoan") {
      setIsRepaymentModalOpen(true);
    }
    setActivePage(modalType);
    setActiveModal(modalType);
    setSidebarOpen(false);
  };

  // Close modal manually or by clicking outside
  const closeModal = () => {
    setShowModal(false);
    setActiveModal(null);
  };

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
      case "LoanRepayment":
        return <i className="fas fa-reply" style={{ color: "#0a2e65" }}></i>;
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
        return <i className="fas fa-wallet" style={{ color: "black" }}></i>;
      case "Electricity":
        return <i className="fas fa-bolt" style={{ color: "orangered" }}></i>;
      case "Airtime":
        return <i className="fas fa-phone" style={{ color: "black" }}></i>;
      case "Internet":
        return <i className="fas fa-wifi" style={{ color: "#0066f5" }}></i>;
      case "Subscription":
        return <i className="fas fa-refresh" style={{ color: "green" }}></i>;
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

    if (isNaN(loanAmountValue) || loanAmountValue <= 0) {
      setErrorMessage("Please enter a valid loan amount.");
      setErrorModalOpen(true);
      return;
    }

    if (loanAmountValue > maxLoanAmount) {
      setErrorMessage(
        `You can only borrow up to ₦${maxLoanAmount.toLocaleString()}.`
      );
      setErrorModalOpen(true);
      return;
    }

    if (userData.balance >= 1000000) {
      setErrorMessage(
        "You cannot borrow funds because your current balance is ₦1,000,000 or more."
      );
      setErrorModalOpen(true);
      return;
    }

    const updatedBalance = userData.balance + loanAmountValue;
    const updatedUserData = { ...userData, balance: updatedBalance };

    setUserData(updatedUserData);
    localStorage.setItem(
      `user-${userData.id}`,
      JSON.stringify(updatedUserData)
    );

    setLoanBalance((prevBalance) => {
      const newBalance = prevBalance + loanAmountValue;
      localStorage.setItem(`loanBalance-${userData.id}`, newBalance);
      return newBalance;
    });

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

    setLastLoanAmount(loanAmountValue);

    setLoanAmount("");
    setLoanSuccessModalOpen(true);
  };

  const handleLoanRepayment = () => {
    const repaymentValue = parseFloat(repaymentAmount);

    if (isNaN(repaymentValue) || repaymentValue <= 0) {
      setErrorMessage("Please enter a valid repayment amount.");
      setErrorModalOpen(true);
      return;
    }

    if (repaymentValue > userData.balance) {
      setErrorMessage("Insufficient balance for this repayment.");
      setErrorModalOpen(true);
      return;
    }

    if (repaymentValue > loanBalance) {
      setErrorMessage(
        `Repayment exceeds the remaining loan balance of ₦${loanBalance.toLocaleString()}.`
      );
      setErrorModalOpen(true);
      return;
    }

    const updatedBalance = userData.balance - repaymentValue;
    const updatedLoanBalance = loanBalance - repaymentValue;

    setUserData({ ...userData, balance: updatedBalance });
    localStorage.setItem(
      `user-${userData.id}`,
      JSON.stringify({ ...userData, balance: updatedBalance })
    );

    setLoanBalance(updatedLoanBalance);
    localStorage.setItem(`loanBalance-${userData.id}`, updatedLoanBalance);

    const newTransaction = {
      id: uuid4(),
      fullName: userData.fullName,
      date: new Date().toLocaleDateString(),
      type: "LoanRepayment",
      amount: `₦${repaymentValue.toLocaleString()}`,
      description: "Loan Repayment",
    };

    setTransactions([...transactions, newTransaction]);
    saveTransactionsToLocalStorage([...transactions, newTransaction]);

    if (updatedLoanBalance === 0) {
      setMaxLoanAmount((prevAmount) => {
        const newAmount = prevAmount + 4000000; // Unlock next tier
        localStorage.setItem(`maxLoanAmount-${userData.id}`, newAmount);
        return newAmount;
      });
    }

    // Save the last repayment amount
    setLastRepaymentAmount(repaymentValue);

    setRepaymentAmount("");
    setIsRepaymentModalOpen(false);
    setRepaymentSuccessModalOpen(true);
  };

  const handleTransferFunds = (receiverIdentifier, amount, description) => {
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

    let receiverDataKey;

    if (receiverIdentifier.includes("@")) {
      receiverDataKey = Object.keys(localStorage).find((key) => {
        if (key.startsWith("user-")) {
          try {
            const user = JSON.parse(localStorage.getItem(key));
            return user?.email === receiverIdentifier;
          } catch (error) {
            console.error(`Invalid JSON for key: ${key}`, error);
            return false;
          }
        }
        return false;
      });
    } else {
      receiverDataKey = Object.keys(localStorage).find((key) => {
        if (key.startsWith("user-")) {
          try {
            const user = JSON.parse(localStorage.getItem(key));
            return user?.accountNumber === receiverIdentifier;
          } catch (error) {
            console.error(`Invalid JSON for key: ${key}`, error);
            return false;
          }
        }
        return false;
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
      description: description || "Outgoing Transfer",
    };

    const receiverTransaction = {
      id: uuid4(),
      fullName: userData.fullName || "Unknown",
      type: "Credit",
      amount: `₦${formatNumber(transferAmount)}`,
      date: new Date().toLocaleDateString(),
      description: description || "Incoming Transfer",
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
    setTransferDescription(""); // Reset description input
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

  const getProvidersForBillType = (billType) => {
    switch (billType) {
      case "Electricity":
        return ["IKEDC NG", "IBEDC NG", "AEDC NG", "EKEDC NG"];
      case "Airtime":
        return ["AIRTEL NG", "MTN NG", "GLO NG", "9MOBILE NG"];
      case "Internet":
        return [
          "MTN NG",
          "AIRTEL NG",
          "GLO NG",
          "9MOBILE NG",
          "SPECTRANET NG",
          "SWIFT NG",
          "iPNX NG",
          "SMILE NG",
        ];
      case "Subscription":
        return ["DSTV", "GoTV NG", "SHOWMAX", "AMAZON", "STARTIMES", "NETFLIX"];
      default:
        return [];
    }
  };

  const openBillModal = (type) => {
    setBillType(type);
    setBillAmount("");
    setIsBillModalOpen(true);
  };

  const handleConfirmPayBill = () => {
    const amount = parseFloat(billAmount);

    if (!selectedProvider) {
      setErrorMessage("Please select a provider.");
      setErrorModalOpen(true);
      return;
    }

    if (!billAmount || isNaN(amount) || amount <= 0) {
      setErrorMessage("Invalid amount. Please enter a valid number.");
      setErrorModalOpen(true);
      return;
    }

    if (billType === "Airtime" && (!phoneNumber || phoneNumber.length < 11)) {
      setErrorMessage("Please enter a valid phone number.");
      setErrorModalOpen(true);
      return;
    }

    if (
      billType === "Internet" &&
      ["MTN NG", "AIRTEL NG", "GLO NG", "9MOBILE NG"].includes(
        selectedProvider
      ) &&
      (!phoneNumber || phoneNumber.length < 11)
    ) {
      setErrorMessage("Please enter a valid phone number.");
      setErrorModalOpen(true);
      return;
    }

    if (
      billType === "Internet" &&
      !["MTN NG", "AIRTEL NG", "GLO NG", "9MOBILE NG"].includes(
        selectedProvider
      ) &&
      (!cardNumber || cardNumber.length !== 10)
    ) {
      setErrorMessage("Please enter a valid 10-digit card number.");
      setErrorModalOpen(true);
      return;
    }

    if (
      billType === "Subscription" &&
      (!smartCardNumber || smartCardNumber.length !== 10)
    ) {
      setErrorMessage("Please enter a valid 10-digit smart card number.");
      setErrorModalOpen(true);
      return;
    }

    if (
      billType === "Electricity" &&
      (!meterNumber || meterNumber.length !== 10)
    ) {
      setErrorMessage("Please enter a valid 10-digit meter number.");
      setErrorModalOpen(true);
      return;
    }

    if (amount > userData.balance) {
      setErrorMessage("Insufficient balance for this bill payment.");
      setErrorModalOpen(true);
      return;
    }

    // Deduct bill amount from balance
    const updatedUserData = { ...userData, balance: userData.balance - amount };
    setUserData(updatedUserData);
    localStorage.setItem(
      `user-${userData.id}`,
      JSON.stringify(updatedUserData)
    );

    // Record the bill payment transaction
    const newTransaction = {
      id: uuid4(),
      fullName: userData.fullName,
      date: new Date().toLocaleDateString(),
      type: `${billType}`,
      amount: `₦${amount.toLocaleString("en-NG")}`,
      description: `${billType} Bill`,
    };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    saveTransactionsToLocalStorage(updatedTransactions);

    // Close input modal and show success modal
    setIsBillModalOpen(false);
    setBillSuccessModalOpen(true);
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

  const getMainContent = () => {
    if (activePage === "transactionHistory") {
      return (
        <>
          <div className="transaction-history">
            <div className={`account-overview ${sidebarOpen ? "open" : ""}`}>
              <p className={`overview-text ${sidebarOpen ? "open" : ""}`}>
                Account Overview
              </p>
            </div>
            <div className="transaction-header">
              <h2 className="transaction-heading">Transaction History</h2>
              <div className="button-mark">
                <div className="search-bar">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search Transaction"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  className="back-to-dashboard-button"
                  onClick={() => setActivePage("dashboard")}
                >
                  &larr; Back to Dashboard
                </button>
              </div>
            </div>
            <div className="table-container full-page">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Recipient</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Transaction Reference</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions
                      .slice()
                      .reverse()
                      .map((transaction) => (
                        <tr
                          key={transaction.id}
                          onClick={() => openReceipt(transaction)}
                          className="transaction-row"
                        >
                          <td>{getTransactionIcon(transaction.type)}</td>
                          <td>{transaction.fullName}</td>
                          <td>{transaction.date}</td>
                          <td>{transaction.type}</td>
                          <td>TRN{transaction.id}</td>
                          <td>{transaction.description}</td>
                          <td>{transaction.amount}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        className="transaction-failed"
                        colSpan="7"
                        style={{ textAlign: "center", padding: "20px" }}
                      >
                        <FontAwesomeIcon icon={faFrown} className="fa-icon" />{" "}
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Receipt Modal for Transaction History */}
          {isReceiptModalOpen && selectedTransaction && (
            <div
              className="modal-overlay"
              onClick={() => setIsReceiptModalOpen(false)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="row1">
                  <h2 className="receipt-header">Transaction Receipt</h2>
                  <button onClick={shareReceipt} className="share-button">
                    Share
                  </button>
                </div>
                <div className="receipt">
                  <div className="receipt-details">
                    <p>
                      <strong>Date:</strong> {selectedTransaction.date}
                    </p>
                    <p>
                      <strong>Amount:</strong> ₦{selectedTransaction.amount}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedTransaction.description}
                    </p>
                    <p>
                      <strong>Recipient:</strong>{" "}
                      {selectedTransaction.fullName || "N/A"}
                    </p>
                    <p>
                      <strong>Transaction Reference:</strong> TRN
                      {selectedTransaction.id}
                    </p>
                    <p className="status">
                      <strong>Status:</strong>
                      <span className="status-success">Successful</span>
                    </p>
                  </div>
                  <div className="modal-buttons">
                    <button
                      onClick={downloadReceipt}
                      className="download-button"
                    >
                      Download Receipt
                    </button>
                    <button
                      onClick={() => setIsReceiptModalOpen(false)}
                      className="close-button"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }

    return null; // Default content if no activePage
  };

  return (
    <div className="dashboard">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
      </button>
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          {profileImage ? (
            <img
              src={profileImage}
              alt="User Profile"
              className="profile-image"
              // onClick={() => setActiveModal("updateProfileImage")}
              onClick={() => handleSidebarItemClick("updateProfileImage")}
            />
          ) : (
            <div
              className="profile-placeholder"
              // onClick={() => setActiveModal("updateProfileImage")}
              onClick={() => handleSidebarItemClick("updateProfileImage")}
            >
              {userData?.fullName?.[0]?.toUpperCase() || "G"}
            </div>
          )}
          <h5 className="text-name">{userData?.fullName || "Guest"}</h5>
          <p className="text-acct">
            Acc. No: {userData?.accountNumber || "N/A"}
          </p>
        </div>

        {/* Sidebar Items */}
        <ul className="sidebar-list">
          <li
            className="sidebar-item height"
            onClick={() => handleSidebarItemClick("accountInfo")}
          >
            <FontAwesomeIcon icon={faUserCircle} className="fa-icon" />
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
            onClick={() => handleSidebarItemClick("repayLoan")}
          >
            <FontAwesomeIcon icon={faHandHoldingUsd} className="fa-icon" />
            <span>Repay Loan</span>
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleSidebarItemClick("settings")}
          >
            <FontAwesomeIcon icon={faCog} className="fa-icon" />
            <span>Settings</span>
          </li>
          <div className="sidebar-logout">
            <li
              className="sidebar-item below-sidebar"
              onClick={() => handleSidebarItemClick("logout")}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="fa-icon" />
              <span>Logout</span>
            </li>
          </div>
        </ul>
      </div>
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}
      {getMainContent() || (
        <div className={`main-content ${sidebarOpen ? "overlay" : ""}`}>
          <div className={`main-content ${sidebarOpen ? "blurred" : ""}`}>
            <div className={`account-overview ${sidebarOpen ? "open" : ""}`}>
              <p className={`overview-text ${sidebarOpen ? "open" : ""}`}>
                Account Overview
              </p>
            </div>
            <div className="card-bill grid .grid--2-cols">
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

              <div className="bills-section">
                <h2>Bills Payment</h2>
                <div className="bills-grid">
                  {/* Electricity */}
                  <div
                    className="bill-item"
                    onClick={() => openBillModal("Electricity")}
                  >
                    <div>
                      <img className="bill-image" src={bill1} alt="bill-logo" />
                      <p>Electricity</p>
                    </div>
                    <div className="bill-icon">
                      <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                  </div>

                  {/* Internet */}
                  <div
                    className="bill-item"
                    onClick={() => openBillModal("Internet")}
                  >
                    <div>
                      <img className="bill-image" src={bill2} alt="bill-logo" />
                      <p>Internet</p>
                    </div>
                    <div className="bill-icon">
                      <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                  </div>

                  {/* Subscriptions */}
                  <div
                    className="bill-item"
                    onClick={() => openBillModal("Subscription")}
                  >
                    <div>
                      <img className="bill-image" src={bill3} alt="bill-logo" />
                      <p>Subscription</p>
                    </div>
                    <div className="bill-icon">
                      <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                  </div>
                  {/* Airtime */}
                  <div
                    className="bill-item"
                    onClick={() => openBillModal("Airtime")}
                  >
                    <div>
                      <img className="bill-image" src={bill4} alt="bill-logo" />
                      <p>Airtime</p>
                    </div>
                    <div className="bill-icon">
                      <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
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
              <div className="table-container recent-only">
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Recipient</th>
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
                      // Only show the 4 most recent transactions
                      .slice(0, 4)
                      .map((transaction) => (
                        <tr
                          key={transaction.id}
                          onClick={() => openReceipt(transaction)}
                          className="transaction-row"
                        >
                          <td>{getTransactionIcon(transaction.type)}</td>
                          <td>{transaction.fullName}</td>
                          <td>{transaction.date}</td>
                          <td>{transaction.type}</td>
                          <td>TRN{transaction.id}</td>
                          <td>{transaction.description}</td>
                          <td>{transaction.amount}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Bill Payment Modal */}
            {isBillModalOpen && (
              <div
                className="modal-overlay"
                onClick={() => setIsBillModalOpen(false)}
              >
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2>Pay {billType} Bill</h2>

                  {/* Provider Selection */}
                  <label htmlFor="provider">Select Provider</label>
                  <select
                    id="provider"
                    className="bill-provider-select custom-select"
                    value={selectedProvider}
                    onChange={(e) => setSelectedProvider(e.target.value)}
                  >
                    <option value="">Choose a provider</option>
                    {getProvidersForBillType(billType).map((provider) => (
                      <option key={provider} value={provider}>
                        {provider}
                      </option>
                    ))}
                  </select>

                  {/* Conditional Inputs */}
                  {billType === "Airtime" && selectedProvider && (
                    <div>
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number"
                        className="bill-input"
                      />
                    </div>
                  )}

                  {billType === "Internet" && selectedProvider && (
                    <div>
                      {["MTN NG", "AIRTEL NG", "GLO NG", "9MOBILE NG"].includes(
                        selectedProvider
                      ) ? (
                        <div>
                          <label htmlFor="phoneNumber">Phone Number</label>
                          <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter phone number"
                            className="bill-input"
                          />
                        </div>
                      ) : (
                        <div>
                          <label htmlFor="cardNumber">Card Number</label>
                          <input
                            type="number"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d{0,10}$/.test(value)) {
                                setCardNumber(value); // Only accept numeric input up to 10 digits
                              }
                            }}
                            placeholder="Enter 10-digit card number"
                            className="bill-input"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {billType === "Subscription" && selectedProvider && (
                    <div>
                      <label htmlFor="smartCardNumber">Smart Card Number</label>
                      <input
                        type="number"
                        id="smartCardNumber"
                        value={smartCardNumber}
                        onChange={(e) => setSmartCardNumber(e.target.value)}
                        placeholder="Enter 10-digit smart card number"
                        className="bill-input"
                      />
                    </div>
                  )}

                  {billType === "Electricity" && selectedProvider && (
                    <div>
                      <label htmlFor="meterNumber">Meter Number</label>
                      <input
                        type="number"
                        id="meterNumber"
                        value={meterNumber}
                        onChange={(e) => setMeterNumber(e.target.value)}
                        placeholder="Enter 10-digit meter number"
                        className="bill-input"
                      />
                    </div>
                  )}

                  {/* Amount Input */}
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="bill-input"
                  />

                  {/* Modal Buttons */}
                  <div className="modal-buttons">
                    <button
                      onClick={handleConfirmPayBill}
                      className="confirm-bill-button"
                    >
                      Pay
                    </button>
                    <button
                      onClick={() => setIsBillModalOpen(false)}
                      className="cancel-bill-button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Bill Payment Success Modal */}
            {billSuccessModalOpen && (
              <div
                className="modal-overlay"
                onClick={() => setBillSuccessModalOpen(false)}
              >
                <div className="modal-content">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    size="3x"
                    style={{ color: "green" }}
                  />
                  <h2>Payment Successful!</h2>
                  <p>
                    Your {billType} bill of ₦
                    {parseFloat(billAmount).toLocaleString("en-NG")} has been
                    paid successfully.
                  </p>
                  <div className="modal-buttons">
                    <button
                      onClick={() => setBillSuccessModalOpen(false)}
                      className="success-button"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* {Receipt Modal} */}
            {isReceiptModalOpen && selectedTransaction && (
              <div
                className="modal-overlay"
                onClick={() => setIsReceiptModalOpen(false)}
              >
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="row1">
                    <h2 className="receipt-header">Transaction Receipt</h2>
                    <button onClick={shareReceipt} className="share-button">
                      Share
                    </button>
                  </div>

                  <div className="receipt">
                    <div className="receipt-details">
                      <p className="text-align">
                        <strong>Date:</strong> {selectedTransaction.date}
                      </p>
                      <p>
                        <strong>Amount:</strong> {selectedTransaction.amount}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {selectedTransaction.description}
                      </p>
                      <p>
                        <strong>Recipient:</strong>{" "}
                        {selectedTransaction.fullName || "N/A"}
                      </p>
                      <p>
                        <strong>Transaction Reference:</strong>{" "}
                        {selectedTransaction.id}
                      </p>
                      <p className="status">
                        <strong>Status:</strong>
                        <span className="status-success">Successful</span>
                      </p>
                    </div>
                    <div className="modal-buttons">
                      <button
                        onClick={downloadReceipt}
                        className="download-button"
                      >
                        Download Receipt
                      </button>
                      <button
                        onClick={() => setIsReceiptModalOpen(false)}
                        className="cancel-loan"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Loan Request Modal */}
            {activeModal === "loan" && (
              <div className="modal-overlay" onClick={closeModal}>
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2>Request a Loan</h2>
                  <p>
                    <strong>Maximum Loan Amount:</strong> ₦
                    {maxLoanAmount.toLocaleString()}
                  </p>
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

            {/* Loan Repayment Modal */}
            {isRepaymentModalOpen && (
              <div
                className="modal-overlay"
                onClick={() => setIsRepaymentModalOpen(false)}
              >
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2>Repay Loan</h2>
                  <p>
                    <strong>Outstanding Loan Balance:</strong> ₦
                    {loanBalance.toLocaleString("en-NG", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <input
                    type="number"
                    value={repaymentAmount}
                    onChange={(e) => setRepaymentAmount(e.target.value)}
                    placeholder="Enter repayment amount"
                  />
                  <div className="modal-buttons">
                    <button
                      onClick={handleLoanRepayment}
                      className="apply-loan"
                    >
                      Repay
                    </button>
                    <button
                      onClick={() => setIsRepaymentModalOpen(false)}
                      className="cancel-loan"
                    >
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
                    <option value="email">Email Address</option>
                    <option value="accountNumber">Account Number</option>
                  </select>
                  <input
                    type={identifierType === "email" ? "email" : "text"}
                    value={receiverIdentifier}
                    onChange={(e) => setReceiverIdentifier(e.target.value)}
                    placeholder={
                      identifierType === "email"
                        ? "Recipient's Email"
                        : "Recipient's Account No"
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
                  <input
                    type="text"
                    value={transferDescription}
                    onChange={(e) => setTransferDescription(e.target.value)}
                    placeholder="Description (optional)"
                    className="transfer-input"
                  />

                  <div className="modal-buttons">
                    <button
                      onClick={() =>
                        handleTransferFunds(
                          receiverIdentifier,
                          transferAmount,
                          transferDescription
                        )
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
                    Your loan of ₦{lastLoanAmount.toLocaleString()} has been
                    added to your balance.
                  </p>
                  {maxLoanAmount > 1000000 && (
                    <p className="text">
                      Congratulations! You are now eligible for loans up to ₦
                      {maxLoanAmount.toLocaleString()}.
                    </p>
                  )}
                  <div className="modal-buttons">
                    <button
                      onClick={() => setLoanSuccessModalOpen(false)}
                      className="success-button"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Repayment Success Modal */}
            {repaymentSuccessModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <FontAwesomeIcon
                    className="thumbs"
                    icon={faCheckCircle}
                    style={{ color: "green" }}
                    size="3x"
                  />
                  <h2>Repayment Successful!</h2>
                  <p className="text">
                    Your repayment of ₦{lastRepaymentAmount.toLocaleString()}{" "}
                    has been processed successfully.
                  </p>
                  <div className="modal-buttons">
                    <button
                      onClick={() => setRepaymentSuccessModalOpen(false)}
                      className="success-button"
                    >
                      OK
                    </button>
                  </div>
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
                    <option value="Equity Funds">
                      Equity Funds - 5% return
                    </option>
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
                  className="modal-content text-align"
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
                    <strong>Account Number:</strong>{" "}
                    {userData?.accountNumber || "Not available"}
                    {userData?.accountNumber && (
                      <button
                        onClick={() => {
                          if (
                            navigator.clipboard &&
                            navigator.clipboard.writeText
                          ) {
                            navigator.clipboard
                              .writeText(userData.accountNumber)
                              .then(() => alert("Account number copied!"))
                              .catch(() =>
                                alert("Failed to copy account number.")
                              );
                          } else {
                            // Fallback for unsupported browsers
                            const textarea = document.createElement("textarea");
                            textarea.value = userData.accountNumber;
                            document.body.appendChild(textarea);
                            textarea.select();
                            try {
                              document.execCommand("copy");
                              alert("Account number copied!");
                            } catch (err) {
                              alert("Failed to copy account number.");
                            }
                            document.body.removeChild(textarea);
                          }
                        }}
                        className="copy-button"
                        title="Copy Account Number"
                      >
                        <i className="fa fa-copy" aria-hidden="true"></i>
                      </button>
                    )}
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
            {/* Transaction History Modal
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
          )} */}
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
                    style={{ color: "#0a2e65" }}
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
            {activeModal === "updateProfileImage" && (
              <div className="modal-overlay" onClick={closeModal}>
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2>Update Profile Picture</h2>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleProfileImageUpload(e)}
                    className="bg-color"
                  />
                  <div className="modal-buttons">
                    <button onClick={closeModal} className="cancel-button">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
