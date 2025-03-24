import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
// import listingRouter from "./routes/listing.route.js";
// import inquiryRouter from "./routes/inquiry.route.js";
import path from "path";

// import authRouter from "./controllers/auth.controller.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// app.use(cors());
// app.use(express.json({ limt: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
// app.use("/api/listing", listingRouter);
// app.use("/api/inquiry", inquiryRouter);

// app.use(express.static(path.join(__dirname, "/client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.put("/api/user/update-avatar", async (req, res) => {
  try {
    const { userId, avatar } = req.body;

    if (!userId || !avatar) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile image" });
  }
});

// export default app;
