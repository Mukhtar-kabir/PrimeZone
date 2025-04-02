import React, { useState } from "react";
import "../SignUp/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../../Components/OAuth/OAuth.jsx";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "https://prime-zone.vercel.app";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`{BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="signup">
      <h1>Sing Up</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="disabled">
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <OAuth className="oauth" />
      </form>

      <div className="haveAnAccount">
        <p>Have an account?</p>
        <Link to="/sign-in" className="link">
          <span>Sign In</span>
        </Link>
      </div>

      {error && <p className="parag">User already exist. Try to Sign In</p>}
    </div>
  );
};

export default SignUp;
