import mongoose from "mongoose";
import CodingProblemModel from "../models/CodingProblemModel.js";
import { USER } from "../constants/constants.js";

export const getCodingProblems = async (req, res) => {
    try {
        const codingProblems = await CodingProblemModel.find();
        res.status(200).json(codingProblems);
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
        const codingProblems = await CodingProblemModel.findById(id);
        res.status(200).json(codingProblems);
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
        res.status(201).json(newCodingProblem);
    } catch (error) {
        res.status(409).json({ message: "發生錯誤" });
        console.log(error);
    }
};

export const deleteCodingProblem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send(`No coding problem with id: ${id}`);
        return;
    }

    if (req.userType !== USER.ADMIN) {
        console.log("NOT ADMIN");
        res.status(404).send("Not admin");
        return;
    }

    await CodingProblemModel.findByIdAndRemove(id);

    res.status(200).json({ message: "成功刪除測試結果" });
};
