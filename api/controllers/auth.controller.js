import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
// import cloudinary from "../config/cloudinary.js";

const adminUsernames = ["Anwarvc", "Muhsin1k", "Mukhtar"];

export const signin = async (req, res, next) => {
  const { mode, username, phoneNumber, password } = req.body;

  try {
    let validUser;

    if (mode === "admin") {
      validUser = await User.findOne({ username });
      if (!validUser || !adminUsernames.includes(username)) {
        return next(errorHandler(404, "Admin not found or unauthorized"));
      }

      validUser.isAdmin = true; // Mark admin explicitly (optional)
    } else {
      validUser = await User.findOne({ phoneNumber });
      if (!validUser) {
        return next(errorHandler(404, "You are not registered by the Admin!"));
      }
    }

    const isPasswordCorrect = bcryptjs.compareSync(
      password,
      validUser.password
    );
    if (!isPasswordCorrect) {
      return next(errorHandler(401, "Wrong credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ success: true, user: rest });
  } catch (err) {
    next(err);
  }
};

// export const signup = async (req, res, next) => {
//   const { username, email, phoneNumber, dateOfBirth, password } = req.body;
//   const hashedPassword = bcryptjs.hashSync(password, 10);
//   const newUser = new User({
//     username,
//     email,
//     phoneNumber,
//     password: hashedPassword,
//   });
//   try {
//     await newUser.save();
//     res.status(201).json("User created Successfully!");
//   } catch (error) {
//     next(error);
//   }
// };

// export const signin = async (req, res, next) => {
//   const { email, phoneNumber, password } = req.body;
//   try {
//     const validUser = await User.findOne({ email, phoneNumber });
//     if (!validUser) return next(errorHandler(404, "User not found!"));

//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"));

//     if (adminEmails.includes(validUser.email)) {
//       validUser.isAdmin = true;
//     }

//     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
//     const { password: pass, ...rest } = validUser._doc;
//     res
//       .cookie("access_token", token, { httpOnly: true })
//       .status(200)
//       .json({ success: true, user: rest });
//   } catch (error) {
//     next(error);
//   }
// };

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// export const signOut = async (req, res, next) => {
//   try {
//     res.clearCookie("access_token", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // Ensures security in production
//       sameSite: "None",
//     });
//     res
//       .status(200)
//       .json({ success: true, message: "User has been logged out!" });
//   } catch (error) {
//     next(error);
//   }
// };

export const createUserByAdmin = async (req, res, next) => {
  try {
    const { username, email, phoneNumber, password, isAdmin } = req.body;

    // Optionally, only allow admin to do this
    // if (!req.user?.isAdmin) return next(errorHandler(403, "Access denied"));

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(errorHandler(400, "User already exists"));

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      phoneNumber,
      password: hashedPassword,
      // isAdmin: isAdmin || true,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration (you can adjust this)
    });

    // Set a cookie with the token for HTTP-only access
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json({ success: true, message: "User created by admin." });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
