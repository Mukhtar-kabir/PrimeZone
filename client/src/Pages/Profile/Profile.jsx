import React, { useState, useRef } from "react";
import "../Profile/Profile.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
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

        <div className="items">
          <span onClick={handleDeleteUser}>Delete account</span>
          <span onClick={handleSignOut}>Sign Out</span>
        </div>
      </form>

      <p className="error">{error ? "Fialed to Update" : ""}</p>
      <p className="success">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
    </div>
  );
};

export default Profile;
