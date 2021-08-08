import express from "express";
import {
    getCodingProblems,
    getCodingProblem,
    createCodingProblem,
    deleteCodingProblem,
} from "../controllers/codingProblems.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCodingProblems);
router.get("/:id", getCodingProblem);
router.post("/", auth, createCodingProblem);

router.delete("/:id", auth, deleteCodingProblem);

export default router;
