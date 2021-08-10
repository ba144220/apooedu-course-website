import express from "express";

import { signin, signup, accountConfirmation, getUsers, deleteUser } from "../controllers/user.js";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/confirmation/:token", accountConfirmation);

router.get("/", [userAuth, adminAuth], getUsers);
router.get("/:id", [userAuth, adminAuth], deleteUser);

export default router;
