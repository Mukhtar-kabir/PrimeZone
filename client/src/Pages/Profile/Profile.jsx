import React, { useState, useRef } from "react";
import "../Profile/Profile.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signoutUserFailure,
} from "../../redux/user/userSlice";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar);
  const [uploading, setUploading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    avatar: currentUser.avatar,
  });

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      await uploadImageToCloudinary(selectedFile);
    }
  };

  const BASE_URL = "https://prime-zone.vercel.app";

  const updateUserProfile = async (newAvatarUrl) => {
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `${BASE_URL}/api/user/update-avatar/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ avatar: newAvatarUrl }),
        }
      );

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        setErrorMessage(data.message);
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const uploadImageToCloudinary = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Set in Cloudinary settings

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/drhqzdtnz/image/upload",
        formData
      );

      const newAvatarUrl = response.data.secure_url;
      setAvatarUrl(newAvatarUrl); // Update preview
      await updateUserProfile(newAvatarUrl);
      // setFormData((prev) => ({ ...prev, avatar: newAvatarUrl }));

      // setAvatarUrl(response.data.secure_url);
      // updateUserProfile(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle Form Submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     dispatch(updateUserStart());
  //     const res = await fetch(`/api/user/update/${currentUser._id}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(updateUserFailure(data.message));
  //       SetErrorMessage(false);
  //       return;
  //     }

  //     dispatch(updateUserSuccess(data));
  //     setUpdateSuccess(true);
  //   } catch (error) {
  //     dispatch(updateUserFailure(error.message));
  //   }
  // };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // const handleSignOut = async () => {
  //   try {
  //     dispatch(signOutUserStart());
  //     const res = await fetch("/api/auth/signout", {
  //       method: "GET",
  //       credentials: "include", // Ensures cookies are sent
  //     });
  //     const data = await res.json();

  //     if (!data.success) {
  //       dispatch(signoutUserFailure(data.message));
  //       return;
  //     }

  //     dispatch(signoutUserSuccess(data));
  //   } catch (error) {
  //     dispatch(signoutUserFailure(error.message));
  //   }
  // };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`${BASE_URL}/api/auth/signout`, {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
      });

      if (!res.ok) throw new Error("Failed to sign out");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <input
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* <img src={currentUser.avatar} alt="profile" /> */}

      <img
        src={avatarUrl}
        alt="profile"
        onClick={() => fileRef.current.click()}
        style={{
          cursor: "pointer",
          objectFit: "cover",
          height: "5rem",
          width: "5rem",
        }}
      />

      {uploading && <p className="uploading">Uploading...</p>}

      <form onSubmit={(e) => e.preventDefault()}>
        {/* If the user is an admin, allow them to update credentials */}
        {currentUser.isAdmin && (
          <>
            <input
              value={formData.username}
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />
            <input
              value={formData.email}
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />
            <input
              value={formData.password}
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
          </>
        )}

        <button
          disabled={loading}
          className="disabled"
          onClick={() => updateUserProfile(avatarUrl)}
        >
          {loading ? "Loading..." : "Update Profile"}
        </button>

        {!currentUser.isAdmin && (
          <a href="/dashboard">
            <p>Dashboard</p>
          </a>
        )}
        <div className="items">
          <span onClick={handleDeleteUser}>Delete account</span>
          <span onClick={handleSignOut}>Sign Out</span>
        </div>
      </form>

      {/* <form onSubmit={(e) => e.preventDefault()}>
        <input
          defaultValue={currentUser.username}
          type="username"
          placeholder="username"
          id="username"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.phoneNumber}
          type="number"
          placeholder="phone number"
          id="number"
          onChange={handleChange}
        />
        <input type="password" placeholder="password" id="password" />
        <button disabled={loading} className="disabled">
          {loading ? "Loading..." : "Update"}
        </button>

        {!currentUser.isAdmin && (
          <a href="/dashboard">
            <p>Dashboard</p>
          </a>
        )}

        <div className="items">
          <span onClick={handleDeleteUser}>Delete account</span>
          <span onClick={handleSignOut}>Sign Out</span>
        </div>
      </form> */}

      <p className="error">{errorMessage ? "Fialed to Update" : ""}</p>
      <p className="success">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>

      {/* {userListings && userListings.length > 0 && (
        <div className="">
          <h1 className="">Your Listings</h1>
          {userListings.map((listing) => (
            <div key={listing._id} className="listing-showing">
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="listing cover" />
              </Link>
              <Link className="" to={`/listing/${listing._id}`}>
                <p>{listing.name}</p>
              </Link>

              <div className="listing-showing_button">
                <button
                  className="delete"
                  onClick={() => handleListingDelete(listing._id)}
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="edit">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Profile;
