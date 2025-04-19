// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
//   fetchUserData,
// } from "../../redux/user/userSlice.js";
// import OAuth from "../../Components/OAuth/OAuth.jsx";

// const SignIn = () => {
//   const [formData, setFormData] = useState({});
//   const { loading, error } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const BASE_URL = "https://prime-zone.vercel.app";

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(signInStart());

//       const res = await fetch(/api/auth/signin, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       // console.log("API Response:", data);

//       if (!res.ok || data.success === false) {
//         dispatch(signInFailure(data.message || "Sign-in failed"));
//         return;
//       }

//       if (data.user && data.user._id) {
//         dispatch(signInSuccess(data.user));
//         // console.log("User ID:", data.user._id);

//         if (data.user.isAdmin) {
//           navigate("/assign-property"); // Admin's dashboard
//         } else {
//           navigate("/dashboard"); // Regular user's dashboard
//         }

//         // dispatch(fetchUserData(data.user._id));
//         // navigate("/dashboard");
//       } else {
//         dispatch(signInFailure("User data is incomplete or missing."));
//       }
//     } catch (error) {
//       console.error("Error during sign-in:", error);
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <div className="signin">
//       <h1>Sign In</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="email"
//           id="email"
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           placeholder="phone number"
//           id="phoneNumber"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="password"
//           id="password"
//           onChange={handleChange}
//         />
//         <button disabled={loading} className="disabled">
//           {loading ? "Loading..." : "Sign In"}
//         </button>

//         <OAuth className="aouth" />
//       </form>

//       {/* <div className="haveAnAccount">
//         <p>Dont have an account?</p>
//         <Link to="/sign-up" className="link">
//           <span>Sign Up</span>
//         </Link>
//       </div> */}

//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice.js";

const SignIn = () => {
  const [mode, setMode] = useState("user"); // user or admin
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const BASE_URL = "https://prime-zone.vercel.app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch(`/api/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, mode }),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data.user));
      navigate(data.user.isAdmin ? "/admin-dashboard" : "/dashboard");
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className="signin">
      <h1>Sign In</h1>
      <div className="toggle-container">
        <button
          onClick={() => setMode("user")}
          className={mode === "user" ? "active" : ""}
        >
          Customer
        </button>
        <button
          onClick={() => setMode("admin")}
          className={mode === "admin" ? "active" : ""}
        >
          Admin
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {mode === "admin" ? (
          <input
            type="text"
            id="username"
            placeholder="Admin Username"
            onChange={handleChange}
            required
          />
        ) : (
          <input
            type="text"
            id="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
        )}
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SignIn;
