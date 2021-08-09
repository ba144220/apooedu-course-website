import mongoose from "mongoose";
import SubmissionModel from "../models/submissionModel.js";
import CodingProblemModel from "../models/CodingProblemModel.js";
import { USER, SUBMISSION_STATUS } from "../constants/constants.js";
import axios from "axios";

// 實現一個等待函數
const delay = (interval) => {
    return new Promise((resolve) => {
        setTimeout(resolve, interval);
    });
};

// export const getTests = async (req, res) => {
//     try {
//         const testMessages = await TestMessage.find();
//         res.status(200).json(testMessages);
//     } catch (error) {
//         res.status(404).json({ message: "發生錯誤" });
//         console.log("ERROR at controllers/tests.js/getTests");
//         console.log(error);
//     }
// };
export const postSubmission = async (req, res) => {
    const submission = req.body;
    const { id } = req.params;

    const newSub = new SubmissionModel({
        ...submission,
        creator: req.userId,
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

        let get_token_options = {
            method: "POST",
            url: "http://140.112.21.13:2358/submissions",
            params: { base64_encoded: "false", fields: "*" },
            headers: {
                "content-type": "application/json",
            },
            data: {
                language_id: 71,
                source_code: newSub.code + "\n" + problem.judge,
            },
        };

        let {
            data: { token },
        } = await axios.request(get_token_options);

        let status_id = 1;

        let payload = null;

        while (status_id === 1) {
            // 等待 1 秒
            await delay(1000);

            let { data } = await axios.get(
                `http://140.112.21.13:2358/submissions/${token}?base64_encoded=false&fields=*`
            );
            console.log("data");
            status_id = data.status.id;
            payload = data;
        }

        //newSub.exeTime = exeTime;
        //newSub.status = status;
        // await newSub.save();
        res.status(201).json({ message: "上傳成功", type: "success", payload: payload });
    } catch (error) {
        console.log("ERROR at controllers/tests.js/createTest");
        console.log(error);
        res.status(409).json({ message: "發生錯誤", type: "error" });
    }
};

export const deleteTest = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send(`No test with id: ${id}`);
        return;
    }

    if (req.userType !== USER.ADMIN) {
        console.log("NOT ADMIN");
        res.status(404).send("Not admin");
        return;
    }

    await TestMessage.findByIdAndRemove(id);

    res.json({ message: "成功刪除測試結果" });
};
