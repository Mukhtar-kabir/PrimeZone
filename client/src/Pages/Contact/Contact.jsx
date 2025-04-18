import React from "react";
import "../Contact/Contact.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MdUnfoldMore } from "react-icons/md";

const Contact = () => {
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  return (
    <div>
      <div className="contact"></div>
      <footer>
        <div className="footer-container">
          <div className="left">
            {/* <img src="/Images/logo.jpeg" alt="" /> */}
            <h3>
              PrimeZone <br />
              Estates LTD.
            </h3>
            <p>
              PrimeZone Estates LTD is a trusted real estate company committed
              to providing premium properties in prime locations. We offer
              flexible payment options and 24/7 customer support, ensuring a
              seamless experience for our clients.
            </p>
          </div>

          <div className="right">
            <div className="links">
              <Link to="" className="link">
                <img src="/Images/twitter.png" alt="" />
              </Link>

              <Link
                to="https://www.instagram.com/muhseen_estate_expert?igsh=eHphMGs5ZjRvczdq&utm_source=qr"
                className="link"
              >
                <img src="/Images/instagram.png" alt="" />
              </Link>

              <Link
                to="https://www.facebook.com/share/165HC6dhtA/?mibextid=LQQJ4d"
                className="link"
              >
                <img src="/Images/facebook.png" alt="" />
              </Link>

              <Link
                to="https://api.whatsapp.com/send/?phone=%2B2347063447840&text&type=phone_number&app_absent=0"
                className="link"
              >
                <img src="/Images/whatsapp.png" alt="" />
              </Link>
            </div>

            <Link to="" className="terms">
              <h4 style={{ color: "white" }}>Terms & Privacy Policy</h4>
            </Link>
          </div>
        </div>

        <div className="contact-container">
          <div className="">
            <h4>Address:</h4>
            <p>No 344 BUk Road opposite kano polytechnic central admin.</p>
          </div>

          <div className="">
            <h4>Contact:</h4>
            <p>07063447840</p>
            <p>09064404380</p>
          </div>
        </div>
      </footer>

      <div className="categories" onClick={toggleCategories}>
        {/* <MdCategory /> */}
        <div className="view">
          <p>View Properties</p>
          <MdUnfoldMore />
        </div>
        {showCategories && (
          <ul className="category-list">
            <li>Land/plots</li>
            <li>Luxury homes</li>
            <li>Distress properties</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Contact;
