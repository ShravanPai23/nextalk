import express from "express";
import { signup, login, logout, getAllUserProfile } from "../controllers/user.controller.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getUserProfile", authenticate, getAllUserProfile);


export default router;