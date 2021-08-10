import express from "express";
import {
    getCodingProblems,
    getCodingProblem,
    createCodingProblem,
    deleteCodingProblem,
    updateCodingProblem,
} from "../controllers/codingProblem.js";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getCodingProblems);
router.get("/:id", getCodingProblem);
router.post("/", [userAuth, adminAuth], createCodingProblem);

router.delete("/:id", [userAuth, adminAuth], deleteCodingProblem);
router.patch("/:id", [userAuth, adminAuth], updateCodingProblem);

export default router;
