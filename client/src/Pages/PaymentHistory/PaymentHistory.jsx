import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentHistory = ({ userId }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const BASE_URL = "https://prime-zone.vercel.app";

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/${userId}`);
        setPaymentHistory(response.data.paymentHistory);
      } catch (error) {
        console.error("Error fetching payment history", error);
      }
    };

    fetchPaymentHistory();
  }, [userId]);

  const handleDownloadReceipt = async (paymentId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users/${userId}/receipt/${paymentId}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt-${paymentId}.pdf`);
      link.click();
    } catch (error) {
      console.error("Error downloading receipt", error);
    }
  };

  const handleFilterByDate = (date) => {
    const filteredPayments = paymentHistory.filter(
      (payment) =>
        new Date(payment.date).toLocaleDateString() ===
        new Date(date).toLocaleDateString()
    );
    setSelectedDate(filteredPayments);
  };

  return (
    <div>
      <h3>Payment History</h3>
      <input type="date" onChange={(e) => handleFilterByDate(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {(selectedDate.length > 0 ? selectedDate : paymentHistory).map(
            (payment) => (
              <tr key={payment._id}>
                <td>{payment.propertyId.name}</td>
                <td>{payment.amount}</td>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDownloadReceipt(payment._id)}>
                    Download Receipt
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
