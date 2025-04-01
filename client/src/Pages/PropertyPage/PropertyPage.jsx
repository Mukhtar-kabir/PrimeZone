import React from "react";
import "../PropertyPage/PropertyPage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../../Components/ListingItem/ListingItem";
import { manualListings } from "../../data/ManualListings";
import { MdUnfoldMore } from "react-icons/md";
import { useLocation } from "react-router-dom";

function PropertyPage() {
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

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

      {/* <div className="inquiry">
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
            <textarea
              name="message"
              placeholder="Message"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit">Send via WhatsApp</button>
          </form>
        </div>
      </div> */}

      <div className="locate">
        <iframe
          width="100%"
          height="400"
          src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=No%20344%20BUk%20Road%20opposite%20kano%20polytechnic%20central%20admin.+(PrimeZone%20Estates%20LTD)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/collections/drones/">gps drone</a>
        </iframe>
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
              <h4>Terms & Privacy Policy</h4>
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
    </>
  );
}

export default PropertyPage;
