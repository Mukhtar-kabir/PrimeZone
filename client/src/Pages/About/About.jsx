import React from "react";
import "../About/About.css";
import { MdCategory } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MdUnfoldMore } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { FaAward } from "react-icons/fa";

const About = () => {
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  return (
    <section>
      <div className="about">
        <div className="why-choose-us">
          <div className="why-choose-us_container">
            <h2 style={{ color: "white" }}>Why Choose Us</h2>
            <div className="contents">
              <div className="content">
                <FaAward className="icon" />
                <p>Trusted Real Estate Experts</p>
                <span>
                  Our team of seasoned real estate professionals ensures
                  reliable guidance and expert advice for all your property
                  needs.
                </span>
              </div>

              <div className="content">
                <FaSackDollar className="icon" />
                <p>Flexible Payment Options</p>
                <span>
                  We offer a variety of payment plans tailored to suit your
                  budget and financial preferences.
                </span>
              </div>

              <div className="content">
                <FaLocationDot className="icon" />
                <p>Prime Locations</p>
                <span>
                  Our properties are strategically situated in sought-after
                  areas, offering convenience and high investment value.
                </span>
              </div>

              <div className="content">
                <IoCallSharp className="icon" />
                <p>24/7 Customer Support</p>
                <span>
                  Our dedicated support team is available around the clock to
                  assist you with any inquiries or concerns.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </section>
  );
};

export default About;
