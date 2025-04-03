import React from "react";
import { useSelector } from "react-redux";
import "../PaymentHistory/PaymentHistory.css";

const PaymentHistory = () => {
  const { paymentHistory = [] } = useSelector((state) => state.user || {}); // Default to empty array if no payment history

  return (
    <div className="container">
      <h1 className="title">Payment History</h1>
      {paymentHistory.length === 0 ? (
        <p className="no-payments">You have no payment history yet.</p>
      ) : (
        <div className="payments-table">
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment._id}>
                  <td>${payment.amount}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td className={payment.status === "Paid" ? "paid" : "unpaid"}>
                    {payment.status}
                  </td>
                  <td>
                    {payment.receiptUrl ? (
                      <a
                        href={payment.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Receipt
                      </a>
                    ) : (
                      "No Receipt"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
