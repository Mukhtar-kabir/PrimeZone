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
  signoutUserStart,
  signoutUserFailure,
  signoutUserSuccess,
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
  const [userListings, setUserListings] = useState([]);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    avatar: currentUser.avatar,
  });
  console.log("Form Data", formData);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      await uploadImageToCloudinary(selectedFile);
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
      setFormData((prev) => ({ ...prev, avatar: newAvatarUrl }));

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

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

  const handleSignOut = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (!data.success) {
        setShowListingsError(true);
        return;
      }

      // if (data.success === false) {
      //   setShowListingsError(true);
      //   return;
      // }

      setUserListings(data.listings);
    } catch (error) {
      setShowListingsError(true);
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

      <form onSubmit={handleSubmit}>
        <input
          defaultValue={currentUser.username}
          type="username"
          placeholder="username"
          id="username"
          onClick={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          placeholder="email"
          id="email"
          onClick={handleChange}
        />
        <input type="password" placeholder="password" id="password" />
        <button disabled={loading} className="disabled">
          {loading ? "Loading..." : "Update"}
        </button>

        <Link to={"/create-listing"} className="listing">
          Create Listing
        </Link>

        <div className="items">
          <span onClick={handleDeleteUser}>Delete account</span>
          <span onClick={handleSignOut}>Sign Out</span>
        </div>
      </form>

      <p className="error">{error ? "Fialed to Update" : ""}</p>
      <p className="success">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
      <button onClick={handleShowListings} className="show-listings">
        Show Listings
      </button>
      <p>{showListingsError ? "Error showing listings" : ""}</p>

      {userListings && userListings.length > 0 && (
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
      )}
    </div>
  );
};

export default Profile;
