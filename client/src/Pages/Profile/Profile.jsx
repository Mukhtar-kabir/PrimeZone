import React, { useState, useRef } from "react";
import "../Profile/Profile.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar);
  const [uploading, setUploading] = useState(false);

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
      const response = await axios.put(
        "https://api.cloudinary.com/v1_1/drhqzdtnz/image/upload",
        formData
      );

      setAvatarUrl(response.data.secure_url);
      updateUserProfile(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const updateUserProfile = async (newAvatarUrl) => {
    try {
      await axios.put("/api/user/update-avatar", {
        userId: currentUser._id,
        avatar: newAvatarUrl,
      });

      console.log("Profile updated successfully:", response.data);

      // Dispatch updated user info to Redux (assuming you have a Redux action for this)
      dispatch({ type: "UPDATE_USER_AVATAR", payload: newAvatarUrl });
    } catch (error) {
      console.error("Error updating profile:", error);
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
      />

      {uploading && <p className="uploading">Uploading...</p>}

      <form>
        <input type="username" placeholder="username" id="username" />
        <input type="email" placeholder="email" id="email" />
        <input type="password" placeholder="password" id="password" />
        <button className="disabled">update</button>

        <div className="items">
          <span>Delete account</span>
          <span>Sign Out</span>
        </div>
      </form>
    </div>
  );
};

export default Profile;
