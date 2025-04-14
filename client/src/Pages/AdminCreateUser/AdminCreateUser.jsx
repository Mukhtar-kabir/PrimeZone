import React, { useState } from "react";
import "../AdminCreateUser/AdminCreateUser.css";

const AdminCreateUser = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    // isAdmin: false, // checkbox if needed
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const BASE_URL = "https://prime-zone.vercel.app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/users/admin/create-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send cookie with token
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create user");
      setMessage("✅ User created successfully");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="container">
      <div className="admin-create-user">
        <h2>Create User</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {/* <label>
            <input type="checkbox" id="isAdmin" onChange={handleChange} />
            Make Admin?
          </label> */}
          <button type="submit">Create User</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AdminCreateUser;
