import React from "react";
import "../Header/Header.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header>
      <div className="items">
        <div className="left">
          <img src="Images/logo.jpeg" alt="LOGO" />
        </div>

        <div className="center">
          <input type="text" placeholder="Search..." />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </div>

        <div className="right">
          <Link to="/" className="link">
            <li>Home</li>
          </Link>

          <Link to="/about" className="link">
            <li>About</li>
          </Link>

          <Link to="/properties" className="link">
            <li>Properties</li>
          </Link>

          <Link to="/contact" className="link">
            <li>Contact</li>
          </Link>

          <Link to="/profile" className="link profile">
            {currentUser ? (
              <img
                src={
                  currentUser.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1hIiQRnLbjQWO-iqNOdhuDSzuieyWRGr8WX9WIf4WZ5g7-opy4_xoccI&s"
                }
                alt="profile"
              />
            ) : (
              <li>Client Potal</li>
            )}
          </Link>

          {/* <Link to="/sign-up" className="link">
            <li>Client Potal</li>
          </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
