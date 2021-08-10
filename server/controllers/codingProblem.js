import mongoose from "mongoose";
import CodingProblemModel from "../models/CodingProblemModel.js";
import { USER } from "../constants/constants.js";

export const getCodingProblems = async (req, res) => {
    try {
        const codingProblems = await CodingProblemModel.find();
        const lightProblems = codingProblems.map((prob) => ({
            title: prob.title,
            difficulty: prob.difficulty,
            _id: prob._id,
        }));

        res.status(200).json(lightProblems);
    } catch (error) {
        res.status(404).json({ message: "發生錯誤" });
        console.log(error);
    }
};
export const getCodingProblem = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: `No coding problem with id: ${id}` });
        return;
    }
    try {
        const prob = await CodingProblemModel.findById(id);

        prob.testData = "";
        res.status(200).json(prob);
    } catch (error) {
        res.status(404).json({ message: "發生錯誤" });
        console.log(error);
    }
};
export const createCodingProblem = async (req, res) => {
    const codingProblem = req.body;

    const newCodingProblem = new CodingProblemModel({
        ...codingProblem,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    });

    try {
        await newCodingProblem.save();
        console.log("成功新增程式題目");
        res.status(201).json({ message: "成功上傳", type: "success" });
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: "發生錯誤", type: "error" });
    }
};

export const deleteCodingProblem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send(`No coding problem with id: ${id}`);
        return;
    }

    await CodingProblemModel.findByIdAndRemove(id);
    console.log("成功刪除題目");
    res.status(200).json({ message: "成功刪除題目", type: "success" });
};

export const updateCodingProblem = async (req, res) => {
    const { id } = req.params;
    const { title, judge, template, difficulty, markdown, testData } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "找不到對應的id", type: "error" });
        }

        const updatedProblem = { title, judge, template, difficulty, markdown, testData, _id: id };

        await CodingProblemModel.findByIdAndUpdate(id, updatedProblem, { new: true });
        console.log("成功更新題目");
        res.status(200).json({ message: "成功更新題目", type: "success" });
    } catch (error) {
        res.status(404).json({ message: "發生錯誤", type: "error" });
    }
};
