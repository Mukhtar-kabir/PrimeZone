import express from "express";
import { signin, google, signOut } from "../controllers/auth.controller.js";

const router = express.Router();

// router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut);
// router.put("/update-avatar", updateAvatar);

export default router;
