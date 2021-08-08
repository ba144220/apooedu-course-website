import mongoose from "mongoose";
import { DIFFICULTY } from "../constants/constants.js";

const problemSchema = mongoose.Schema({
    creator: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    title: { type: String, required: true },
    difficulty: { type: String, enum: DIFFICULTY, default: DIFFICULTY.MEDIUM },
    markdown: { type: String, required: true },

    template: { type: String },
    judge: { type: String },
    testData: { type: String },
});

var CodingProblemModel = mongoose.model("coding_problems", problemSchema);
export default CodingProblemModel;
