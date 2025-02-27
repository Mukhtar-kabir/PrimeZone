import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },

    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1hIiQRnLbjQWO-iqNOdhuDSzuieyWRGr8WX9WIf4WZ5g7-opy4_xoccI&s",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
