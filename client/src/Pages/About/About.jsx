import React from "react";
import "../About/About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="about">
        <h1>About</h1>
      </div>
      <Link
        to={
          "https://api.whatsapp.com/send/?phone=%2B2347063447840&text&type=phone_number&app_absent=0"
        }
      >
        <img
          className="whatsapp-icon"
          src="/Images/whatsapp.png"
          alt="Whatsapp Icon"
        />
      </Link>
    </div>
  );
};

export default About;
