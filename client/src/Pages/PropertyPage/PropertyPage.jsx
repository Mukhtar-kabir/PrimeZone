import React from "react";
import "../PropertyPage/PropertyPage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../../Components/ListingItem/ListingItem";
import { manualListings } from "../../data/ManualListings";

function PropertyPage() {
  return (
    <div className="properties">
      <h3>Featured Properties</h3>
      <div className="properties-Page">
        {manualListings.map((listing) => (
          <ListingItem listing={listing} key={listing._id} />
        ))}
      </div>
    </div>
  );
}

export default PropertyPage;
