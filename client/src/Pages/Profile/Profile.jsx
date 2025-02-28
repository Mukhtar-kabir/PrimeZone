import React from "react";
import "../Profile/Profile.css";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="profile">
      <h1>Profile</h1>
      <img src={currentUser.avatar} alt="profile" />
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
