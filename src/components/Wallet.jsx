import React, { useState } from "react";
import styles from "../app.module.css";

const Wallet = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [title, setTitle] = useState("");
  const [currentAmt, setCurrentAmt] = useState(0);
  const [tranSactionList, setTranSactionList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleWalletAmountAdded = (e) => {
    e.preventDefault();

    const newTotalAmount = totalAmount + currentAmt;

    if (newTotalAmount < 0) {
      alert("Insufficient Wallet Balance");
      return;
    }

    setTotalAmount(newTotalAmount);
    setTitle("");
    setCurrentAmt(0);

    setTranSactionList((prev) => {
      return [
        ...prev,
        {
          id: Math.random().toString(),
          type: currentAmt > 0 ? "Credit" : "Debit",
          title: title,
          amount: currentAmt,
        },
      ];
    });
  };

  const filteredTransactions =
    filter === "all"
      ? tranSactionList
      : tranSactionList.filter(
          (transaction) => transaction.type.toLowerCase() === filter
        );

  return (
    <div
      className={`${styles.walletContainer} ${
        isDarkMode ? styles["dark-mode"] : styles["light-mode"]
      }`}
    >
      <input
        type="checkbox"
        id="toggle"
        className={styles.toggleInput}
        onChange={() => setIsDarkMode(!isDarkMode)}
        checked={isDarkMode}
      />
      <div className={styles.toggleContainer}>
        <div className={styles.toggleSlider}></div>
        <label htmlFor="toggle" className={styles.toggleLabel}>
          Toggle Dark/Light Mode
        </label>
      </div>

      <h4 className={styles.walletHeading}>My Wallet</h4>
      <div className={styles.walletCard}>
        {" "}
        <h4 className={styles.walletHeading}>Wallet Balance</h4>
        <p className={styles.totalAmount}>${totalAmount}</p>
        <form onSubmit={handleWalletAmountAdded} className={styles.walletForm}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              className={styles.inputField}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              name="amountToAdd"
              id="amount"
              className={styles.inputField}
              value={currentAmt}
              onChange={(e) => setCurrentAmt(parseInt(e.target.value))}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Add to Wallet
          </button>
        </form>
      </div>
      <div className={styles.filterButtons}>
        <button onClick={() => setFilter("all")} className={styles.btn}>
          All
        </button>
        <button onClick={() => setFilter("credit")} className={styles.btn}>
          Credited
        </button>
        <button onClick={() => setFilter("debit")} className={styles.btn}>
          Debited
        </button>
      </div>
      {filteredTransactions.length > 0 && (
        <div className={styles.transactionsContainer}>
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`${styles.transactionItem} ${
                transaction.type === "Credit" ? styles.credit : styles.debit
              }`}
            >
              <div>
                <p className={styles.transactionTitle}>{transaction.title}</p>
                <p className={styles.transactionType}>{transaction.type}</p>
              </div>
              <p className={styles.transactionAmount}>${transaction.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wallet;
