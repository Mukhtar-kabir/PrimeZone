import React, { useEffect, useState } from "react";
import "../Header/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header>
      <div className="items">
        <div className="left">
          <Link to={"/"}>
            <img src="Images/logo.jpeg" alt="LOGO" />
          </Link>
        </div>

        <div className="center">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="text-slate-600" />
            </button>
          </form>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav
          className={`right ${menuOpen ? "open" : ""}`}
          style={{ transition: "all 0.3s ease-in-out" }}
        >
          <Link to="/" className="link" onClick={() => setMenuOpen(false)}>
            <li>Home</li>
          </Link>
          <Link to="/about" className="link" onClick={() => setMenuOpen(false)}>
            <li>About</li>
          </Link>
          <Link
            to="/property-page"
            className="link"
            onClick={() => setMenuOpen(false)}
          >
            <li>Properties</li>
          </Link>
          <Link
            to="/contact"
            className="link"
            onClick={() => setMenuOpen(false)}
          >
            <li>Contact</li>
          </Link>
          <Link
            to="/profile"
            className="link profile"
            onClick={() => setMenuOpen(false)}
          >
            {currentUser ? (
              <img
                src={
                  currentUser.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1hIiQRnLbjQWO-iqNOdhuDSzuieyWRGr8WX9WIf4WZ5g7-opy4_xoccI&s"
                }
                alt="profile"
                className="profile-img"
              />
            ) : (
              <li>Client Portal</li>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
