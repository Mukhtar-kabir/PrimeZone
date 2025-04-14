import React, { useState } from "react";
import "../AdminAssignProperty/AdminAssignProperty.css";
import { AdminRoute } from "../../Components/PrivateRoute/AdminRoute";

const AdminAssignProperty = () => {
  const [userId, setUserId] = useState("");
  const [propertyData, setPropertyData] = useState({
    name: "",
    location: "",
    plotSize: "",
    type: "",
    price: "",
    numberOfPlot: 1,
    plotNumber: "",
    depositedAmount: "",
    remainingBalance: "",
    paymentStatus: "Pending",
    imageUrl: "",
    documents: [{ name: "", url: "" }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...propertyData, [name]: value };

    if (name === "price" || name === "depositedAmount") {
      const price = name === "price" ? value : updatedData.price;
      const deposited =
        name === "depositedAmount" ? value : updatedData.depositedAmount;

      const remaining = parseFloat(price || 0) - parseFloat(deposited || 0);
      updatedData.remainingBalance = remaining >= 0 ? remaining : "";
    }

    setPropertyData(updatedData);
  };

  const handleDocumentChange = (index, field, value) => {
    const updatedDocs = [...propertyData.documents];
    updatedDocs[index][field] = value;
    setPropertyData((prev) => ({ ...prev, documents: updatedDocs }));
  };

  const handleAddDocument = () => {
    setPropertyData((prev) => ({
      ...prev,
      documents: [...prev.documents, { name: "", url: "" }],
    }));
  };

  const BASE_URL = "https://prime-zone.vercel.app";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${BASE_URL}/api/users/admin/users/assign-property`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailOrPhone: userId, ...propertyData }),
        }
      );

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        alert("Property assigned successfully!");
        setPropertyData({
          name: "",
          location: "",
          plotSize: "",
          type: "",
          price: "",
          numberOfPlot: "",
          plotNumber: "",
          depositedAmount: "",
          remainingBalance: "",
          paymentStatus: "Pending",
          imageUrl: "",
          documents: [{ name: "", url: "" }],
        });
        setUserId("");
      } else {
        alert(data.message || "Error assigning property.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  const handleFileUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/drhqzdtnz/auto/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      const updatedDocs = [...propertyData.documents];
      updatedDocs[index].url = data.secure_url;

      setPropertyData((prev) => ({ ...prev, documents: updatedDocs }));
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload file");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/drhqzdtnz/auto/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      setPropertyData((prev) => ({ ...prev, imageUrl: data.secure_url }));
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Failed to upload image");
    }
  };

  return (
    <div className="admin-container">
      <h2>Assign Property to User</h2>
      <form className="assign-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Email or Phone Number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Property Name"
          value={propertyData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={propertyData.location}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="plotSize"
          placeholder="Plot Size"
          value={propertyData.plotSize}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Type (Residential/Commercial)"
          value={propertyData.type}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Total Price"
          value={propertyData.price}
          onChange={handleInputChange}
          required
        />

        <input
          type="number"
          name="depositedAmount"
          placeholder="Deposited Amount"
          value={propertyData.depositedAmount}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="remainingBalance"
          placeholder="Remaining Balance"
          value={propertyData.remainingBalance}
          onChange={handleInputChange}
          readOnly
        />
        <input
          type="number"
          name="plotNumber"
          placeholder="Plot Number"
          value={propertyData.plotNumber}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="numberOfPlot"
          placeholder="Number Of Plot"
          value={propertyData.numberOfPlot}
          onChange={handleInputChange}
        />
        <h4>Property Thumbnail</h4>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {propertyData.imageUrl && (
          <p>
            Uploaded:{" "}
            <a
              href={propertyData.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Image
            </a>
          </p>
        )}

        <select
          name="paymentStatus"
          value={propertyData.paymentStatus}
          onChange={handleInputChange}
        >
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>

        {/* <h4>Documents</h4>
        {propertyData.documents.map((doc, index) => (
          <div key={index} className="doc-group">
            <input
              type="text"
              placeholder="Document Name"
              value={doc.name}
              onChange={(e) =>
                handleDocumentChange(index, "name", e.target.value)
              }
            />
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileUpload(e, index)}
            />
            {doc.url && (
              <p>
                Uploaded:{" "}
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  View Document
                </a>
              </p>
            )}
          </div>
        ))} */}

        <button type="button" onClick={handleAddDocument}>
          Add Another Document
        </button>

        <button type="submit">Assign Property</button>
      </form>
    </div>
  );
};

export default AdminAssignProperty;
