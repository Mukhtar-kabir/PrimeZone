// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import "../PropertyDetails/PropertyDetails.css";
// import { saveAs } from "file-saver";
// import { jsPDF } from "jspdf";

// const PropertyDetails = () => {
//   const { propertyId } = useParams();
//   const [property, setProperty] = useState(null);
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const token = localStorage.getItem("access_token"); // Or wherever you store the token
//         const res = await fetch(`/api/users/me/${currentUser._id}`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`, // Send the token
//           },
//         });

//         // const res = await fetch("/api/users/me", {
//         //   method: "GET",
//         //   headers: {
//         //     Authorization: `Bearer ${token}`,
//         //   },
//         // });

//         const data = await res.json();

//         if (data && data.properties) {
//           const matched = data.properties.find(
//             (prop) => prop._id === propertyId
//           );
//           setProperty(matched);
//         } else {
//           console.error("User properties not found", data);
//         }
//       } catch (err) {
//         console.error("Failed to load property", err);
//       }
//     };

//     fetchProperty();
//   }, [propertyId, currentUser._id]);

//   const generateReceipt = (user, property, payment) => {
//     const doc = new jsPDF();

//     // Set up receipt title
//     doc.setFontSize(18);
//     doc.text("Payment Receipt", 105, 20, null, null, "center");
//     doc.setFontSize(12);

//     // Add user details
//     doc.text(`Name: ${user.username}`, 10, 40);
//     doc.text(`Email: ${user.email}`, 10, 50);
//     doc.text(`Phone: ${user.phoneNumber}`, 10, 60);

//     // Add property details
//     doc.text(`Property: ${property.name}`, 10, 80);
//     doc.text(`Location: ${property.location}`, 10, 90);
//     doc.text(`Price: ₦${property.price}`, 10, 100);

//     // Add payment details
//     doc.text(`Amount Paid: ₦${payment.amount}`, 10, 120);
//     doc.text(`Date: ${new Date(payment.date).toLocaleDateString()}`, 10, 130);
//     doc.text(`Status: ${payment.status}`, 10, 140);

//     // Add thank you message
//     doc.text("Thank you for your payment!", 105, 160, null, null, "center");

//     // Save the PDF
//     doc.save(`receipt-${property.name}.pdf`);
//   };

//   // Example usage
//   const user = {
//     username: "John Doe",
//     email: "johndoe@example.com",
//     phoneNumber: "08012345678",
//   };

//   const propertty = {
//     name: "Sunny Bungalow",
//     location: "Lagos, Nigeria",
//     price: 1000000,
//   };

//   const payment = {
//     amount: 500000,
//     date: new Date(),
//     status: "Paid",
//   };

//   // Call the function to generate the receipt
//   generateReceipt(user, propertty, payment);

//   // const handleDownloadReceipt = async () => {
//   //   try {
//   //     const response = await fetch(
//   //       `/api/users/${currentUser._id}/receipt/${property._id}`,
//   //       {
//   //         method: "GET",
//   //         headers: {
//   //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//   //         },
//   //       }
//   //     );

//   //     if (response.ok) {
//   //       const blob = await response.blob(); // Get the PDF file as a blob
//   //       saveAs(blob, `receipt-${property.name}.pdf`); // Trigger download
//   //     } else {
//   //       alert("Error downloading receipt");
//   //     }
//   //   } catch (err) {
//   //     console.error("Error:", err);
//   //     alert("Failed to download receipt");
//   //   }
//   // };

//   if (!property) return <div>Loading...</div>;

//   return (
//     <div className="property-detail-container">
//       <h2>{property.name}</h2>
//       <img
//         src={property.imageUrl}
//         alt={property.name}
//         style={{ maxWidth: "100%", height: "auto" }}
//       />
//       <p>
//         <strong>Location:</strong> {property.location}
//       </p>
//       <p>
//         <strong>Type:</strong> {property.type}
//       </p>
//       <p>
//         <strong>Plot Size:</strong> {property.plotSize}
//       </p>
//       <p>
//         <strong>Price:</strong> ₦{property.price}
//       </p>
//       <p
//         className={`status ${
//           property.paymentStatus === "Paid" ? "paid" : "unpaid"
//         }`}
//       >
//         <strong>Status:</strong> {property.paymentStatus}
//       </p>

//       <h3>Documents</h3>
//       {property.documents.map((doc, idx) => (
//         <div key={idx}>
//           <p>{doc.name}</p>
//           <a href={doc.url} download target="_blank" rel="noreferrer">
//             Download Document
//           </a>
//         </div>
//       ))}

//       <button onClick={() => generateReceipt(user, property, payment)}>
//         Download Receipt
//       </button>

//       {/* <button
//         className="download-receipt-button"
//         onClick={handleDownloadReceipt}
//       >
//         Download Receipt (PDF)
//       </button> */}

//       {/* <a
//         href={`/api/users/${currentUser._id}/receipt/${property._id}`}
//         target="_blank"
//         rel="noreferrer"
//       >
//         Download Receipt (PDF)
//       </a> */}

//       {/* {property.paymentStatus === "Paid" &&
//         currentUser?.paymentHistory?.length > 0 &&
//         (() => {
//           const payment = currentUser.paymentHistory.find(
//             (p) => p.status === "Paid" && p.receiptUrl
//           );

//           if (!payment) return null;

//           return (
//             <>
//               <h3>Payment Receipt</h3>
//               <a
//                 href={payment.receiptUrl}
//                 download
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Download Receipt
//               </a>
//             </>
//           );
//         })()} */}

//       {/* {property.paymentStatus === "Paid" && (
//         <>
//           <h3>Payment Receipt</h3>
//           <a
//             href={`https://api.example.com/receipts/${property._id}`} // Update with your receipt path
//             download
//             target="_blank"
//             rel="noreferrer"
//           >
//             Download Receipt
//           </a>
//         </>
//       )} */}
//     </div>
//   );
// };

// export default PropertyDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../PropertyDetails/PropertyDetails.css";
import { jsPDF } from "jspdf";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const BASE_URL = "https://prime-zone.vercel.app";

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Or wherever you store the token
        const res = await fetch(`${BASE_URL}/api/users/me/${currentUser._id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`, // Send the token
          },
        });

        const data = await res.json();

        if (data && data.properties) {
          const matched = data.properties.find(
            (prop) => prop._id === propertyId
          );
          setProperty(matched);
        } else {
          console.error("User properties not found", data);
        }
      } catch (err) {
        console.error("Failed to load property", err);
      }
    };

    fetchProperty();
  }, [propertyId, currentUser._id]);

  const generateReceipt = (user, property, payment) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("PrimeZone LTD", 105, 20, null, null, "center");

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Payment Receipt", 105, 30, null, null, "center");

    // Horizontal line
    doc.setLineWidth(0.5);
    doc.line(10, 35, 200, 35);

    // User Info
    doc.setFontSize(12);
    doc.text("Customer Details:", 10, 45);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${user.username}`, 10, 55);
    doc.text(`Email: ${user.email}`, 10, 63);
    doc.text(`Phone: ${user.phoneNumber}`, 10, 71);

    // Property Info
    doc.setFont("helvetica", "bold");
    doc.text("Property Details:", 10, 85);
    doc.setFont("helvetica", "normal");
    doc.text(`Property: ${property.name}`, 10, 95);
    doc.text(`Location: ${property.location}`, 10, 103);
    doc.text(`Type: ${property.type}`, 10, 111);
    doc.text(`Plot Size: ${property.plotSize}`, 10, 119);
    doc.text(`Plot Number: ${property.plotNumber}`, 10, 127); // <- moved down
    doc.text(`Number Of Plot: ${property.numberOfPlot}`, 10, 135); // <- moved down
    doc.text(`Price: ₦${property.price.toLocaleString()}`, 10, 143);

    // Payment Info
    doc.setFont("helvetica", "bold");
    doc.text("Payment Information:", 10, 157);
    doc.setFont("helvetica", "normal");
    doc.text(`Amount Paid: ₦${payment.amount.toLocaleString()}`, 10, 167);
    doc.text(`Date: ${new Date(payment.date).toLocaleDateString()}`, 10, 175);
    doc.text(`Status: ${payment.status}`, 10, 183);

    // Footer
    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for your payment!", 105, 200, null, null, "center");

    // Save
    doc.save(`receipt-${property.name}.pdf`);
  };

  // Check if property is available before rendering
  if (!property) return <div>Loading...</div>;

  // Payment details for the receipt
  const payment = {
    amount: 500000, // This should be dynamic based on the actual payment data
    date: new Date(),
    status: "Paid", // You can change the status depending on the property payment status
  };

  return (
    <div className="propertDetails">
      <div className="property-detail-container">
        <h2>{property.name}</h2>
        <img
          src={property.imageUrl}
          alt={property.name}
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <p>
          <strong>Location:</strong> {property.location}
        </p>
        <p>
          <strong>Type:</strong> {property.type}
        </p>
        <p>
          <strong>Plot Size:</strong> {property.plotSize}
        </p>
        <p>
          <strong>Price:</strong> ₦{property.price}
        </p>
        <p>
          <strong>Plot Number:</strong> {property.plotNumber}
        </p>
        <p>
          <strong>Number Of Plot:</strong> {property.numberOfPlot}
        </p>
        <p
          className={`status ${
            property.paymentStatus === "Paid" ? "paid" : "unpaid"
          }`}
        >
          <strong>Status:</strong> {property.paymentStatus}
        </p>

        <h3>Documents</h3>
        {property.documents.map((doc, idx) => (
          <div key={idx}>
            <p>{doc.name}</p>
            <a href={doc.url} download target="_blank" rel="noreferrer">
              Download Document
            </a>
          </div>
        ))}

        {/* Button to generate the receipt when clicked */}
        <button onClick={() => generateReceipt(currentUser, property, payment)}>
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
