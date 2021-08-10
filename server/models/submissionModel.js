import mongoose from "mongoose";
import { SUBMISSION_STATUS } from "../constants/constants.js";

const submissionSchema = mongoose.Schema({
    creator: String,
    firstName: String,
    lastName: String,
    exeTime: Number,
    status: {
        type: Number,
    },

    submittedAt: {
        type: Date,
        default: new Date(),
    },
    code: String,
});

var SubmissionModel = mongoose.model("submissions", submissionSchema);
export default SubmissionModel;
