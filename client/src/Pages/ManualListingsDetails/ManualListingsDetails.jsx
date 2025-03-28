import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { manualListings } from "../../data/ManualListings";
import "../ManualListingsDetails/ManualListingsDetails.css";
import { FaMapMarkerAlt, FaBath, FaBed, FaChair } from "react-icons/fa";
import ContactManual from "../../Components/ContactManual/ContactManual";
import { useSelector } from "react-redux";

function ManualListingsDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const foundListing = manualListings.find((item) => item._id === id);
    if (foundListing) {
      setListing(foundListing);
    }
  }, [id]);

  if (!listing) {
    return <p>Listing not found</p>;
  }

  // const handleContactClick = () => {
  //   if (!currentUser) {
  //     alert("You must be signed in to contact the landlord!");
  //     navigate("/sign-in");
  //     return;
  //   }
  //   setContact(true);
  // };

  return (
    <div className="manual-listing">
      <img src={listing.imageUrls[0]} alt={listing.name} />
      <div className="listings">
        <div className="name-price">
          <h4>{listing.name}</h4>
          <h4>- Naira {listing.regularPrice}</h4>
        </div>

        <div className="address">
          <FaMapMarkerAlt />
          <p>{listing.address}</p>
        </div>

        <div className="sales">
          <p className="sale">
            {listing.type === "rent" ? "For Rent" : "For Sale"}
          </p>
          <p className="discount">{listing.discountPrice} OFF</p>
        </div>

        <p className="desc">{listing.description}</p>

        <div className="bed-bath">
          <div className="bed">
            <FaBed />
            <p>Bed: {listing.bedrooms}</p>
          </div>

          <div className="bath">
            <FaBath className="text-lg" />
            <p>Bath: {listing.bathrooms}</p>
          </div>
        </div>

        {/* {!contact && <button className="contact-btn">Contact Landlord</button>} */}

        {!contact && (
          <button onClick={() => setContact(true)} className="contact-btn">
            Contact Landlord
          </button>
        )}

        {contact && <ContactManual listing={listing} />}
      </div>
    </div>
  );
}

export default ManualListingsDetails;
