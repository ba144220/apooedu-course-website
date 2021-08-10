import express from "express";

import {
    signin,
    signup,
    accountConfirmation,
    getUsers,
    deleteUser,
    upgradeUser,
} from "../controllers/user.js";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/confirmation/:token", accountConfirmation);

router.get("/", [userAuth, adminAuth], getUsers);
router.delete("/:id", [userAuth, adminAuth], deleteUser);
router.patch("/:id", [userAuth, adminAuth], upgradeUser);

export default router;
