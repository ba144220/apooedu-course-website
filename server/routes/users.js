import express from "express";

import { signin, signup, accountConfirmation } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/confirmation/:token", accountConfirmation);

export default router;
