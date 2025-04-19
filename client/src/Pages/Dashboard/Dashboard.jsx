// import React, { useEffect } from "react";
// import "../Dashboard/Dashboard.css";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchUserData } from "../../redux/user/userSlice.js"; // Action to fetch user data

// function Dashboard() {
//   const { currentUser, properties, paymentHistory, pendingPayments } =
//     useSelector((state) => state.user);
//   // console.log("Current User:", currentUser);

//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   if (currentUser._id) {
//   //     dispatch(fetchUserData(currentUser._id)); // Fetch user data
//   //   } else {
//   //     console.log("No user ID found"); // Log message if user ID is undefined
//   //   }
//   // }, [currentUser, dispatch]);

//   return (
//     <div className="dashboard">
//       <div className="container">
//         <div className="overview">
//           <img src={currentUser?.avatar} alt="avatar" />
//           <div className="status">
//             <h1>Welcome, {currentUser?.username || "Customer"}!</h1>
//             <div className="parag">
//               <p>
//                 <span>Email:</span> {currentUser?.email || "Customer"}
//               </p>
//               <p>
//                 <span>Phone Number:</span> {currentUser?.phoneNumber || "N/A"}
//               </p>
//             </div>
//           </div>
//           {/* <div className="summary">
//             <div className="summary-item">
//               <p>Properties Owned: {properties?.length || 0}</p>
//             </div>
//             <div className="summary-item">
//               <p>
//                 Remaining Balance: Naira{" "}
//                 {paymentHistory?.reduce(
//                   (acc, payment) => acc + payment.amount,
//                   0
//                 ) || 0}
//               </p>
//             </div>
//             <div className="summary-item">
//               <p>
//                 Next Payment Due:{" "}
//                 {pendingPayments?.[0]?.dueDate || "Not Available"}
//               </p>
//             </div>
//           </div> */}
//         </div>

//         <div className="menu">
//           <h2>Key Sections</h2>
//           <div className="menu-items">
//             <Link to="/my-properties">
//               <div className="menu-item">
//                 <h3>My Properties</h3>
//               </div>
//             </Link>
//             {/* <Link to="/payment-history">
//               <div className="menu-item">
//                 <h3>Payment History</h3>
//               </div>
//             </Link>
//             <Link to="/pending-payments">
//               <div className="menu-item">
//                 <h3>Pending Payments</h3>
//               </div>
//             </Link> */}
//             <Link to="/support-inquiries">
//               <div className="menu-item">
//                 <h3>Support & Inquiries</h3>
//               </div>
//             </Link>
//             <Link to="/profile">
//               <div className="menu-item">
//                 <h3>Profile Settings</h3>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice"; // Optional: update Redux with new data

function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [localUserData, setLocalUserData] = useState(null); // You can use this OR dispatch to Redux

  const BASE_URL = "https://prime-zone.vercel.app";

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser?._id) return;

      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/users/${currentUser._id}`, {
          method: "GET",
          credentials: "include", // 🔐 sends cookies
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch user");

        // Option 1: Update Redux
        dispatch(signInSuccess(data));

        // Option 2: Update local state
        setLocalUserData(data);

        console.log("✅ User fetched successfully:", data);
      } catch (err) {
        console.error("❌ Failed to fetch user:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [currentUser?._id, dispatch]);

  // Use this instead of currentUser if you prefer local state
  const userData = localUserData || currentUser;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="overview">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <img src={userData?.avatar} alt="avatar" />
              <div className="status">
                <h1>Welcome, {userData?.username || "Customer"}!</h1>
                <div className="parag">
                  <p>
                    <span>Email:</span> {userData?.email || "Customer"}
                  </p>
                  <p>
                    <span>Phone Number:</span> {userData?.phoneNumber || "N/A"}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="menu">
          <h2>Key Sections</h2>
          <div className="menu-items">
            <Link to="/my-properties">
              <div className="menu-item">
                <h3>My Properties</h3>
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
    </div>
  );
}

export default Dashboard;
