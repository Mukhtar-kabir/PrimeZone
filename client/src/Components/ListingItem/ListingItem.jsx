import React from "react";
import "../ListingItem/ListingItem.css";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

function ListingItem({ listing }) {
  const isManualListing = listing._id.startsWith("manual-");

  return (
    <div className="listing-item">
      <Link
        to={
          isManualListing
            ? `/manual-listing/${listing._id}`
            : `/listing/${listing._id}`
        }
        className="link"
      >
        <img
          src={
            listing.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing cover"
        />
        <div className="item p-3 flex flex-col gap-2 w-full">
          <div className="location">
            <MdLocationOn className="icon" />
            <p>{listing.address}</p>
          </div>
          <p className="name">{listing.name}</p>
          <p className="desc">{listing.description}</p>
          <p className="price">
            Naira{" "}
            {listing.offer
              ? listing.discountPrice.toLocaleString("Naira")
              : listing.regularPrice.toLocaleString("Naira")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="bed-bath">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItem;
