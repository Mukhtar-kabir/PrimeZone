import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../ContactManual/ContactManual.css";

function ContactManual({ listing }) {
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="landloard">
      <p className="landlord-name">
        Contact <span className="">Mukhtar Kabir</span> for{" "}
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

        <Link
          to={`mailto:mukhtarkabirmuhammad32@gmail.com?subject=Regarding ${listing.name}&body=${message}`}
          className="button"
        >
          Send Message
        </Link>
      </div>
    </div>
  );
}

export default ContactManual;
