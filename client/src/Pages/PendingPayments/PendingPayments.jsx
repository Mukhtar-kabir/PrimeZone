import React from "react";
import { useSelector } from "react-redux";
import "../PendingPayments/PendingPayments.css";

const PendingPayments = () => {
  const { pendingPayments = [] } = useSelector((state) => state.user || {}); // Default to empty array if no pending payments

  return (
    <div className="container">
      <h1 className="title">Pending Payments</h1>
      {pendingPayments.length === 0 ? (
        <p className="no-pending-payments">You have no pending payments.</p>
      ) : (
        <div className="pending-payments-list">
          {pendingPayments.map((payment) => (
            <div key={payment._id} className="payment-card">
              <h3 className="payment-property-name">{payment.propertyName}</h3>
              <p>Amount: ${payment.amount}</p>
              <p>Due Date: {new Date(payment.dueDate).toLocaleDateString()}</p>
              <p className="payment-status pending">Pending</p>
              <button className="pay-now-button">Pay Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingPayments;
