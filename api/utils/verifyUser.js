// import { errorHandler } from "./error.js";
// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token || req.headers["authorization"];
//   if (!token) return res.status(403).json({ message: "Access denied!" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach the decoded user data (including id) to req.user
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid token!" });
//   }
// };

// middleware/verifyUser.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "./error.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return next(errorHandler(401, "Unauthorized"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return next(errorHandler(404, "User not found"));

    req.user = user; // ✅ Attach the user object to the request
    next();
  } catch (err) {
    return next(errorHandler(401, "Invalid token"));
  }
};
