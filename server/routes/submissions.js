import express from "express";
import { createSubmission } from "../controllers/submission_test.js";
import { postSubmission, getSubmissions, deleteSubmission } from "../controllers/submission.js";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

//router.get("/", createSubmission);
router.post("/:id", userAuth, postSubmission);
router.get("/:id", getSubmissions);
router.delete("/:id", [userAuth, adminAuth], deleteSubmission);

export default router;
