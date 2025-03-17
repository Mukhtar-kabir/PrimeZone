import React from "react";
import "../PropertyPage/PropertyPage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../../Components/ListingItem/ListingItem";
import { manualListings } from "../../data/ManualListings";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function PropertyPage() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const searchTerm = urlParams.get("searchTerm") || ""; // Extract search term from URL

  // State for pagination
  const [displayCount, setDisplayCount] = useState(9);

  // Filter listings based on search term
  const filteredListings = manualListings.filter(
    (listing) =>
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [visibleListings, setVisibleListings] = useState(9); // Initially show 9 properties

  const handleShowMore = () => {
    setDisplayCount((prev) => prev + 9); // Load 9 more properties on click
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/inquiry/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <>
      <div className="properties">
        <h3>Featured Properties</h3>
        {searchTerm && (
          <p>
            Showing results for "<strong>{searchTerm}</strong>"
          </p>
        )}
        <div className="content">
          <div className="properties-Page">
            {filteredListings.slice(0, displayCount).map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
            {/* {manualListings.slice(0, visibleListings).map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))} */}
          </div>

          {displayCount < filteredListings.length && (
            <button onClick={handleShowMore} className="show-more-btn">
              Show More
            </button>
          )}

          {/* No results message */}
          {filteredListings.length === 0 && (
            <p>No properties found matching your search.</p>
          )}

          {/* {visibleListings < manualListings.length && (
            <button className="show-more-btn" onClick={handleShowMore}>
              Show More
            </button>
          )} */}
        </div>
      </div>

      <div className="inquiry">
        <div className="inquiry-form">
          <h2>Make an Inquiry?</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const phoneNumber = "2347063447840";
              const message = `Assalamu alaikum, my name is ${formData.name}. I am reaching out through your website regarding real estate listings.

              Here are my contact details:  
              📞 Phone: ${formData.phone}  
              📧 Email: ${formData.email}  

              Message: ${formData.message}  

              Looking forward to your response. Thank you!`;
              const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                message
              )}`;
              window.open(whatsappLink, "_blank");
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            {/* <textarea
              name="message"
              placeholder="Message"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea> */}
            <button type="submit">Send via WhatsApp</button>
          </form>
        </div>
      </div>

      <footer>
        <div className="footer-container">
          <div className="left">
            <img src="/Images/logo.jpeg" alt="" />
            <p>
              PrimeZone Estates LTD is a trusted real estate company committed
              to providing premium properties in prime locations. We offer
              flexible payment options and 24/7 customer support, ensuring a
              seamless experience for our clients.
            </p>
            <h4>Address:</h4>
            <p>456 Skyline Avenue, Metroville, FAKE456</p>
          </div>

          <div className="right">
            <div className="links">
              <Link to="" className="link">
                <FaTwitter />
              </Link>

              <Link to="" className="link">
                <FaInstagramSquare />
              </Link>

              <Link to="" className="link">
                <FaWhatsappSquare />
              </Link>
            </div>

            <Link to="" className="terms">
              <h4>Terms & Privacy Policy</h4>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default PropertyPage;
