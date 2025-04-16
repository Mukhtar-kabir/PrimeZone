// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import "../MyProperties/MyProperties.css";

// const MyProperties = () => {
//   const { properties = [] } = useSelector((state) => state.user || {});
//   console.log(properties);

//   return (
//     <div className="container">
//       <h1 className="title">My Properties</h1>

//       {properties.length === 0 ? (
//         <p className="no-properties">You have no properties yet.</p>
//       ) : (
//         <>
//           <div className="properties-grid">
//             {properties.map((property) => (
//               <Link
//                 to={`/property/${property._id}`}
//                 key={property._id}
//                 className="link"
//               >
//                 <div className="property-card">
//                   {/* Thumbnail Image */}
//                   {property.imageUrl && (
//                     <img
//                       src={property.imageUrl}
//                       alt={`${property.name} preview`}
//                       className="property-thumbnail"
//                     />
//                   )}

//                   <div className="card-content">
//                     <h2 className="property-title">{property.name}</h2>
//                     <p>Location: {property.location}</p>
//                     <p>Plot Size: {property.plotSize}</p>
//                     <p>Type: {property.type}</p>
//                     <p>Price: Naira {property.price}</p>
//                     <p>Number Of Plot: {property.numberOfPlot}</p>
//                     <p>Plot Number: {property.plotNumber}</p>
//                     <p
//                       className={`payment-status ${
//                         property.paymentStatus === "Paid" ? "paid" : "unpaid"
//                       }`}
//                     >
//                       Payment Status: {property.paymentStatus}
//                     </p>

//                     <button className="details-button">View Details</button>
//                   </div>

//                   {/* Payment History for Each Property */}
//                   {property.paymentHistory &&
//                     property.paymentHistory.length > 0 && (
//                       <div className="payment-history">
//                         <h4>Payment History</h4>
//                         <ul>
//                           {property.paymentHistory.map((payment, index) => (
//                             <li key={index}>
//                               <p>Amount Paid: Naira {payment.amount}</p>
//                               <p>
//                                 Date:{" "}
//                                 {new Date(payment.date).toLocaleDateString()}
//                               </p>
//                               <p>Status: {payment.status}</p>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                 </div>
//               </Link>
//             ))}
//           </div>

//           {/* Separate Payment History Section */}
//           <div className="payment-history-section">
//             <h3>Payment History</h3>
//             {properties.map((property) => (
//               <div key={property._id} className="property-payment-history">
//                 <h4>{property.name}</h4>
//                 {property.paymentHistory &&
//                 property.paymentHistory.length > 0 ? (
//                   <ul>
//                     {property.paymentHistory.map((payment, index) => (
//                       <li key={index}>
//                         <p>Amount Paid: Naira {payment.amount}</p>
//                         <p>
//                           Date: {new Date(payment.date).toLocaleDateString()}
//                         </p>
//                         <p>Status: {payment.status}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No payments found for this property.</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MyProperties;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../MyProperties/MyProperties.css";

const MyProperties = () => {
  // const user = useSelector((state) => state.user);
  const { properties = [] } = useSelector((state) => state.user || {});
  console.log(properties);

  // Assuming user is part of state
  const [selectedProperty, setSelectedProperty] = useState(null);

  // const properties = user?.properties || []; // Default to empty array if properties is undefined
  // console.log(properties);

  const togglePaymentHistory = (propertyId) => {
    setSelectedProperty((prevState) =>
      prevState === propertyId ? null : propertyId
    );
  };

  return (
    <div className="myProperty">
      <div className="container">
        <h1 className="title">My Properties</h1>

        {properties.length === 0 ? (
          <p className="no-properties">You have no properties yet.</p>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <div key={property._id} className="property-card">
                <Link to={`/property/${property._id}`} className="link">
                  {/* Thumbnail Image */}
                  {property.imageUrl && (
                    <img
                      src={property.imageUrl}
                      alt={`${property.name} preview`}
                      className="property-thumbnail"
                    />
                  )}

                  <div className="card-content">
                    <h2 className="property-title">{property.name}</h2>
                    <p>Location: {property.location}</p>
                    <p>Plot Size: {property.plotSize}</p>
                    <p>Type: {property.type}</p>
                    <p>Price: Naira {property.price}</p>
                    <p>Number Of Plot: {property.numberOfPlot}</p>
                    <p>Plot Number: {property.plotNumber}</p>
                    <p
                      className={`payment-status ${
                        property.paymentStatus === "Paid" ? "paid" : "unpaid"
                      }`}
                    >
                      Payment Status: {property.paymentStatus}
                    </p>

                    <button className="details-button">View Details</button>
                  </div>
                </Link>

                {/* Toggleable Payment History */}
                <div className="payment-history-toggle">
                  <button
                    onClick={() => togglePaymentHistory(property._id)}
                    className="toggle-button"
                  >
                    {selectedProperty === property._id
                      ? "Hide Payment History"
                      : "Show Payment History"}
                  </button>

                  {selectedProperty === property._id && (
                    <div className="payment-history">
                      <h4>Payment History</h4>
                      <ul>
                        {property.paymentHistory?.map((payment, index) => (
                          <li key={index}>
                            <p>Amount Paid: Naira {payment.amount}</p>
                            <p>
                              Date:{" "}
                              {new Date(payment.date).toLocaleDateString()}
                            </p>
                            <p>Status: {payment.status}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
