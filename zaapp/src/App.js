// import "./App.css";
// import "./index.css";
// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import SendMoney from "./components/SendMoney";
// import RequestLoan from "./components/RequestLoan";
// import CreateSavingsGoal from "./components/CreateSavingsGoal";
// import TransactionHistory from "./components/TransactionHistory";
// import Investments from "./components/Investments";
// import Navbar from "./components/Navbar";

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Switch>
//         <Route path="/signup" component={SignUp} />
//         <Route path="/login" component={Login} />
//         <Route path="/dashboard" component={Dashboard} />
//         <Route path="/send-money" component={SendMoney} />
//         <Route path="/request-loan" component={RequestLoan} />
//         <Route path="/create-savings-goal" component={CreateSavingsGoal} />
//         <Route path="/transaction-history" component={TransactionHistory} />
//         <Route path="/investments" component={Investments} />
//         <Route path="/" exact component={Login} /> {/* Default route */}
//       </Switch>
//     </Router>
//   );
// };

// export default App;

// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
// import SendMoney from "./components/SendMoney";
// import useStickyNav from "./components/useStickyNav";
// import useFlexboxGapFix from "./components/useFlexboxGapFix";
// import TransactionHistory from "./components/TransactionHistory";
// import Investments from "./components/Investments";
// import Navbar from "./components/Navbar";
// import Home from "./home";

// const App = () => {
//   useStickyNav();
//   useFlexboxGapFix();

//   useEffect(() => {
//     const allLinks = document.querySelectorAll("a:link");
//     const headerEl = document.querySelector(".header");

//     allLinks.forEach((link) => {
//       link.addEventListener("click", (e) => {
//         e.preventDefault();
//         const href = link.getAttribute("href");

//         // Scroll back to top
//         if (href === "#") {
//           window.scrollTo({ top: 0, behavior: "smooth" });
//         }

//         // Scroll to sections with IDs
//         if (href !== "#" && href.startsWith("#")) {
//           const sectionEl = document.querySelector(href);
//           sectionEl?.scrollIntoView({ behavior: "smooth" });
//         }

//         // Close mobile navigation after click
//         if (link.classList.contains("main-nav-link") && headerEl) {
//           headerEl.classList.toggle("nav-open");
//         }
//       });
//     });
//   }, []);

//   return (
//     <Router>
//       {/* <MobileNav /> */}
//       {/* <div className="container mt-5"> */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/send-money" element={<SendMoney />} />
//         {/* <Route path="/request-loan" element={<RequestLoan />} /> */}
//         {/* <Route path="/create-savings-goal" element={<CreateSavingsGoal />} /> */}
//         <Route path="/transaction-history" element={<TransactionHistory />} />
//         <Route path="/investments" element={<Investments />} />
//         <Route path="/navbar" element={<Navbar />} />
//       </Routes>
//       {/* </div> */}
//     </Router>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import SendMoney from "./components/SendMoney";
import TransactionHistory from "./components/TransactionHistory";
import Investments from "./components/Investments";
import Navbar from "./components/Navbar";
import Home from "./home";
import useStickyNav from "./components/useStickyNav";
import useFlexboxGapFix from "./components/useFlexboxGapFix";

const App = () => {
  useStickyNav();
  useFlexboxGapFix();

  useEffect(() => {
    const allLinks = document.querySelectorAll("a:link");
    const headerEl = document.querySelector(".header");

    allLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (href.startsWith("#")) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const sectionEl = document.querySelector(href);
          sectionEl?.scrollIntoView({ behavior: "smooth" });

          if (link.classList.contains("main-nav-link") && headerEl) {
            headerEl.classList.toggle("nav-open");
          }
        });
      }
    });
  }, []);

  return (
    <Router>
      {/* <Navbar /> Navbar should always be visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send-money" element={<SendMoney />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </Router>
  );
};

export default App;
