import express from "express";
import { createSubmission } from "../controllers/submission_test.js";
import { postSubmission } from "../controllers/submission.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", createSubmission);
router.post("/:id", auth, postSubmission);

export default router;
