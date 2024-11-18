# Zaapp

Zaapp is a comprehensive financial management app designed to help users effectively manage their savings goals, track investments, and monitor financial transactions. With an intuitive interface and robust features, Zaapp empowers users to take control of their finances.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Dashboard](#dashboard)
  - [Savings Goals](#savings-goals)
  - [Invest in Stocks](#invest-in-stocks)
  - [Invest in Mutual Funds](#invest-in-mutual-funds)
  - [Transaction History](#transaction-history)
- [Contributing](#contributing)

## Features

- **User Authentication**: Secure login and registration to protect financial data.
- **Persistent Data**: Balances, savings goals, and transaction history are stored in local storage, ensuring persistence across sessions.
- **Savings Goals**:
  - Create and track multiple savings goals with target amounts.
  - Add contributions from the current balance.
  - Withdraw funds back to the current balance.
  - Delete goals only if no money is saved.
- **Invest in Mutual Funds**:
  - Select funds with varying returns.
  - Choose custom durations or preset options (3 months, 6 months, 1 year or custom time).
- **Transaction History**: Comprehensive record of all user transactions, including savings contributions, loans, withdrawals, and investments.
- **Modals for Feedback**: User actions and errors are communicated via modals for improved user experience.
- **Dynamic Dashboard**: View account balance, transaction history, and investment opportunities in one place.

## Installation

To set up and run Zaapp locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/OkungbowaGodspower/Zaapp-Alx-Porfolio-Project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd zaapp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage

### Dashboard

The dashboard provides a clear overview of your financial activities:

- **Account Balance**: Displays the current balance, with an option to hide or show it.
- **Recent Transactions**: Lists recent activities, including savings, withdrawals, loans and investments.
- **Navigation**: Access features like savings goals, transfers, and mutual funds with a single click.

### Savings Goals

- **Create Savings Goals**: Add a goal name and target amount to create a new savings plan.
- **Contribute to Goals**: Deduct funds from your balance to contribute to a goal. Contributions are recorded as transactions.
- **Withdraw Funds**: Transfer money from a goal back to your balance anytime, creating a transaction record.
- **Track Progress**: Monitor goal completion percentages based on contributions.
- **Delete Goals**: Goals can be deleted only when their balance is zero.

### Invest in Mutual Funds

- **Choose Funds:** Select from various mutual funds with different percentage returns.
- **Custom Investment Durations:** Choose from preset durations (3 months, 6 months, 1 year) or specify a custom duration to calculate potential returns.

## Author

- **Okungbowa Godspower**
  - Email: [godspowerokungbowa0@gmail.com](mailto:godspowerokungbowa0@gmail.com)
  - GitHub: [OkungbowaGodspower](https://github.com/OkungbowaGodspower)
