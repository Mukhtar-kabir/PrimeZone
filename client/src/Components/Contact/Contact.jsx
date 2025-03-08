import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Contact/Contact.css";

function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (!listing?.userRef) return;
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <div className="landloard">
      <>
        {landlord && (
          <div className="">
            <p className="landlord-name">
              Contact <span className="">{landlord.username}</span> for{" "}
              <span className="">{listing.name.toLowerCase()}</span>
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
                to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                className="button"
              >
                Send Message
              </Link>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default Contact;
