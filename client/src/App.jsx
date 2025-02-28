import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import About from "./Pages/About/About";
import Profile from "./Pages/Profile/Profile";
import Contact from "./Pages/Contact/Contact";
import Properties from "./Pages/Properties/Properties";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/properties" element={<Properties />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
