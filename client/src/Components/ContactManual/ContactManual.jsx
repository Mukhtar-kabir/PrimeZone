import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../ContactManual/ContactManual.css";

function ContactManual({ listing }) {
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const phoneNumber = "2347063447840";

  // Construct the WhatsApp link
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    `Hello Muhseen Ibrahim (Estate Expert), I'm interested in ${listing.name}. ${message}`
  )}`;

  return (
    <div className="landloard">
      <p className="landlord-name">
        Contact <span className="">Muhseen Ibrahim (Estate Expert)</span> for{" "}
        <span className="">{listing.name}</span>
      </p>
      <div className="message">
        <textarea
          name="message"
          id="message"
          rows="2"
          value={message}
          onChange={onChange}
          placeholder="Enter your message here..."
        ></textarea>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          Send Message on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default ContactManual;
