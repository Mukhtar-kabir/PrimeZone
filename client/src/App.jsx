import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import About from "./Pages/About/About";
import Profile from "./Pages/Profile/Profile";
import Contact from "./Pages/Contact/Contact";
import Properties from "./Pages/Properties/Properties";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";
// import CreateListing from "./Pages/CreateListing/CreateListing";
import UpdateListing from "./Pages/UpdateListing/UpdateListing";
import Search from "./Pages/Search/Search";
import PropertyPage from "./Pages/PropertyPage/PropertyPage";
import ManualListingsDetails from "./Pages/ManualListingsDetails/ManualListingsDetails";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyProperties from "./Pages/MyProperties/MyProperties";
import PaymentHistory from "./Pages/PaymentHistory/PaymentHistory";
import PendingPayments from "./Pages/PendingPayments/PendingPayments";
import SupportInquiries from "./Pages/SupportInquiries/SupportInquiries";
import { AdminRoute } from "./Components/PrivateRoute/AdminRoute";
import AdminAssignProperty from "./Pages/AdminAssignProperty/AdminAssignProperty";
import Unauthorized from "./Pages/Unauthorized/Unauthorized";
import PropertyDetails from "./Pages/PropertyDetails/PropertyDetails";
import LuxuryHomes from "./Pages/LuxuryHomes/LuxuryHomes";
import DistressProperties from "./Pages/DistressProperties/DistressProperties";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import AdminCreateUser from "./Pages/AdminCreateUser/AdminCreateUser";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <div className="loader-container">
          <span className="loader"></span>
          {/* <p>Loading...</p> */}
        </div>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-properties" element={<MyProperties />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            <Route path="/pending-payments" element={<PendingPayments />} />
            <Route path="/support-inquiries" element={<SupportInquiries />} />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            />

            <Route element={<AdminRoute />}>
              <Route
                path="/assign-property"
                element={<AdminAssignProperty />}
              />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/listing/:listingId" element={<Properties />} />
            <Route
              path="/manual-listing/:id"
              element={<ManualListingsDetails />}
            />
            <Route path="/property-page" element={<PropertyPage />} />
            <Route path="/property/:propertyId" element={<PropertyDetails />} />
            <Route path="/luxury-homes" element={<LuxuryHomes />} />
            <Route
              path="/distress-properties"
              element={<DistressProperties />}
            />
            <Route path="/my-properties" element={<MyProperties />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/create-user" element={<AdminCreateUser />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
