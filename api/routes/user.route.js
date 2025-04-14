import express from "express";
import {
  deleteUser,
  test,
  UpdateUser,
  // getUserListings,
  getUser,
  addProperty,
  addPayment,
  assignPropertyToUser,
  getUsers,
  getMe,
  generateReceipt,
  getPaymentHistory,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { createUserByAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, UpdateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
// router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);
router.post("/add-property/:id", verifyToken, addProperty);
router.post("/add-payment/:id", verifyToken, addPayment);
router.put("/admin/users/assign-property", assignPropertyToUser);
router.get("/me/:id", verifyToken, getMe);
router.get("/:userId/receipt/:propertyId", verifyToken, generateReceipt);
router.get("/payment-history/:id", verifyToken, getPaymentHistory);
router.post("/admin/create-user", verifyToken, createUserByAdmin);
// router.get("/:id", verifyToken, getUsers);

export default router;
