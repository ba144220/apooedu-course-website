import mongoose from "mongoose";
import { SUBMISSION_STATUS } from "../constants/constants.js";

const submissionSchema = mongoose.Schema({
    creator: String,
    problem: String,
    firstName: String,
    lastName: String,
    exeTime: Number,
    status: {
        type: Number,
    },

    submittedAt: {
        type: Date,
        default: Date.now,
    },
    code: String,
});

var SubmissionModel = mongoose.model("submissions", submissionSchema);
export default SubmissionModel;
