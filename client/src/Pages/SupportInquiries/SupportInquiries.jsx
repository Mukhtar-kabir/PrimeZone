import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../SupportInquiries/SupportInquiries.css";

const SupportInquiries = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // To show the success or error message

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Placeholder for dispatching an action to handle inquiries
    // You can modify it to integrate with your backend
    dispatch({ type: "SEND_INQUIRY", payload: formData });

    setStatus("Your inquiry has been sent successfully!");
    setFormData({ subject: "", message: "" });
  };

  return (
    <div className="container">
      <h1 className="title">Support & Inquiries</h1>

      {status && <p className="status-message">{status}</p>}

      <form className="inquiry-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Enter your inquiry subject"
          />
        </div>

        <div className="input-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Enter your inquiry message"
          />
        </div>

        <button type="submit" className="submit-button">
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};

export default SupportInquiries;
