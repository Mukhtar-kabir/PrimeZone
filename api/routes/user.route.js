import express from "express";
import {
  deleteUser,
  test,
  UpdateUser,
  // getUserListings,
  getUser,
  addProperty,
  addPayment,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, UpdateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
// router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);
router.post("/add-property/:id", verifyToken, addProperty);
router.post("/add-payment/:id", verifyToken, addPayment);

export default router;
