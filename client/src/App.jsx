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
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/update-listing/:listingId"
                element={<UpdateListing />}
              />
            </Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="/listing/:listingId" element={<Properties />} />
            <Route
              path="/manual-listing/:id"
              element={<ManualListingsDetails />}
            />
            <Route path="/property-page" element={<PropertyPage />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
