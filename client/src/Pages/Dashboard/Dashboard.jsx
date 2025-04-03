// import React from "react";
// import "../Dashboard/Dashboard.css";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// function Dashboard() {
//   const { currentUser } = useSelector((state) => state.user);

//   return (
//     <div className="dashboard">
//       <div className="overview">
//         <h1>Welcome, {currentUser?.username || "Customer"}!</h1>
//         <p>Your current status:</p>
//         <div className="summary">
//           <div className="summary-item">
//             <p>Properties Owned: 3</p>
//           </div>
//           <div className="summary-item">
//             <p>Remaining Balance: Naira 50,000</p>
//           </div>
//           <div className="summary-item">
//             <p>Next Payment Due: 12th May 2025</p>
//           </div>
//         </div>
//       </div>

//       <div className="menu">
//         <h2>Key Sections</h2>
//         <div className="menu-items">
//           <Link to="/properties">
//             <div className="menu-item">
//               <h3>My Properties</h3>
//             </div>
//           </Link>
//           <Link to="/payments">
//             <div className="menu-item">
//               <h3>Payment History</h3>
//             </div>
//           </Link>
//           <Link to="/pending">
//             <div className="menu-item">
//               <h3>Pending Payments</h3>
//             </div>
//           </Link>
//           <Link to="/support">
//             <div className="menu-item">
//               <h3>Support & Inquiries</h3>
//             </div>
//           </Link>
//           <Link to="/profile">
//             <div className="menu-item">
//               <h3>Profile Settings</h3>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect } from "react";
import "../Dashboard/Dashboard.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../redux/user/userSlice"; // Action to fetch user data

function Dashboard() {
  const { currentUser, properties, paymentHistory, pendingPayments } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserData(currentUser.id)); // Dispatch action to fetch user-related data
    }
  }, [currentUser, dispatch]);

  return (
    <div className="dashboard">
      <div className="overview">
        <h1>Welcome, {currentUser?.username || "Customer"}!</h1>
        <p>Your current status:</p>
        <div className="summary">
          <div className="summary-item">
            <p>Properties Owned: {properties?.length || 0}</p>
          </div>
          <div className="summary-item">
            <p>
              Remaining Balance: Naira{" "}
              {paymentHistory?.reduce(
                (acc, payment) => acc + payment.amount,
                0
              ) || 0}
            </p>
          </div>
          <div className="summary-item">
            <p>
              Next Payment Due:{" "}
              {pendingPayments?.[0]?.dueDate || "Not Available"}
            </p>
          </div>
        </div>
      </div>

      <div className="menu">
        <h2>Key Sections</h2>
        <div className="menu-items">
          <Link to="/my-properties">
            <div className="menu-item">
              <h3>My Properties</h3>
            </div>
          </Link>
          <Link to="/payment-history">
            <div className="menu-item">
              <h3>Payment History</h3>
            </div>
          </Link>
          <Link to="/pending-payments">
            <div className="menu-item">
              <h3>Pending Payments</h3>
            </div>
          </Link>
          <Link to="/support-inquiries">
            <div className="menu-item">
              <h3>Support & Inquiries</h3>
            </div>
          </Link>
          <Link to="/profile">
            <div className="menu-item">
              <h3>Profile Settings</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
