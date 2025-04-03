import React from "react";
import { useSelector } from "react-redux";
import "../MyProperties/MyProperties.css";

const MyProperties = () => {
  const { properties = [] } = useSelector((state) => state.user || {});

  return (
    <div className="container">
      <h1 className="title">My Properties</h1>
      {properties.length === 0 ? (
        <p className="no-properties">You have no properties yet.</p>
      ) : (
        <div className="properties-grid">
          {properties.map((property) => (
            <div key={property._id} className="property-card">
              <div className="card-content">
                <h2 className="property-title">{property.name}</h2>
                <p>Location: {property.location}</p>
                <p>Plot Size: {property.plotSize}</p>
                <p>Type: {property.type}</p>
                <p>Price: ${property.price}</p>
                <p
                  className={`payment-status ${
                    property.paymentStatus === "Paid" ? "paid" : "unpaid"
                  }`}
                >
                  Payment Status: {property.paymentStatus}
                </p>
                <button className="details-button">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
