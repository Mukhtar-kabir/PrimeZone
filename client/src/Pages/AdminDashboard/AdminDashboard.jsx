import React from "react";
import { useNavigate } from "react-router-dom";
import "../AdminDashboard/AdminDashboard.css";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="container">
      <div className="admin-dashboard">
        <h2>Welcome, {currentUser?.username}</h2>
        <p>What would you like to do today?</p>
        <div className="admin-actions">
          <button onClick={() => navigate("/assign-property")}>
            Assign Property to User
          </button>
          <button onClick={() => navigate("/admin/create-user")}>
            Create New User Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
