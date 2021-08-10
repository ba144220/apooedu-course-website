import mongoose from "mongoose";
import SubmissionModel from "../models/submissionModel.js";
import CodingProblemModel from "../models/CodingProblemModel.js";
import UserModel from "../models/userModel.js";
import { USER, SUBMISSION_STATUS } from "../constants/constants.js";
import { singleSubmission } from "../utils/submission.js";
import axios from "axios";

export const getSubmissions = async (req, res) => {
    const { id } = req.params;
    try {
        let submissions = await SubmissionModel.find({ problem: id }).exec();
        for (let sub of submissions) {
            sub.code = "";
        }
        res.status(200).json({ message: "成功", type: "success", payload: submissions });
    } catch (error) {
        res.status(404).json({ message: "發生錯誤", type: "error" });
        console.log("ERROR at controllers/tests.js/getTests");
        console.log(error);
    }
};
export const postSubmission = async (req, res) => {
    const submission = req.body;
    const { id } = req.params;

    const newSub = new SubmissionModel({
        ...submission,
        creator: req.userId,
        problem: id,
        createdAt: new Date().toISOString(),
    });

    try {
        // 先驗證 id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log(`No problem with id: ${id}`);
            res.status(404).json({ message: "找不到對應的題目", type: "error" });
            return;
        }
        // 找到 id 對應的題目
        const problem = await CodingProblemModel.findById(id);
        if (!problem) {
            console.log(`Didn't find problem`);
            res.status(404).json({ message: "找不到對應的題目", type: "error" });
            return;
        }
        // 找到使用者
        const user = await UserModel.findById(req.userId);
        if (!user) {
            console.log(`Didn't find user`);
            res.status(404).json({ message: "找不到對應的題目", type: "error" });
            return;
        }
        newSub.firstName = user.firstName;
        newSub.lastName = user.lastName;

        const result = await singleSubmission(newSub.code, problem.judge);

        newSub.exeTime = result.exeTime;
        newSub.status = result.status;
        await newSub.save();
        res.status(201).json({ message: "上傳成功", type: "success", payload: result });
    } catch (error) {
        console.log("ERROR at controllers/tests.js/createTest");
        console.log(error);
        res.status(409).json({ message: "發生錯誤", type: "error" });
    }
};

export const deleteSubmission = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({ message: "找不到該繳交紀錄", type: "error" });
            return;
        }

        await SubmissionModel.findByIdAndRemove(id);

        res.status(200).json({ message: "成功刪除測試結果", type: "warning" });
    } catch (error) {
        res.status(200).json({ message: "發生錯誤", type: "error" });
    }
};
