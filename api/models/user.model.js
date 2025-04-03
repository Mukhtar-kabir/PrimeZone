import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Paid", "Pending"], // status of the payment
    default: "Pending",
  },
  receiptUrl: {
    type: String, // URL to the payment receipt
  },
});

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  plotSize: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true, // e.g., "Bungalow", "Duplex", etc.
  },
  price: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Pending", "Installments Remaining"],
    default: "Pending", // could be paid, pending, or installments left
  },
});

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

    properties: [propertySchema],
    paymentHistory: [paymentSchema],
    pendingPayments: [paymentSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
