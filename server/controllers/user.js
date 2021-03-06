import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs";
import { promisify } from "util";
import mongoose from "mongoose";
import cheerio from "cheerio";

import UserModel from "../models/userModel.js";
import dateString from "../utils/dateString.js";

import { USER } from "../constants/constants.js";

const readFile = promisify(fs.readFile);

const TOKEN_EXPIRES_IN = "7h";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});

export const signin = async (req, res) => {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase().replace(/\s/g, "");

    try {
        // Get the user with that email
        const existingUser = await UserModel.findOne({ email: emailLower });

        // Check if the user exist
        if (!existingUser) {
            console.log("使用者不存在");
            return res.status(404).json({ message: "使用者不存在", type: "error" });
        }

        // Check if the user has been confirmed
        if (!existingUser.confirmed) {
            const currentTime = new Date();
            const createdTime = new Date(existingUser.createdAt);
            if (createdTime.getTime() + 60 * 60 * 1000 < currentTime.getTime()) {
                console.log("驗證已過期，請重新註冊帳號");
                await UserModel.findByIdAndRemove(existingUser._id);
                return res
                    .status(404)
                    .json({ message: "驗證已過期，請重新註冊帳號", type: "error" });
            } else {
                console.log("尚未驗證電子郵件");
                return res.status(404).json({ message: "尚未驗證電子郵件", type: "error" });
            }
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            console.log("密碼錯誤");
            return res.status(400).json({ message: "密碼錯誤", type: "error" });
        }

        // Give the token
        const token = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser._id,
                userType: existingUser.userType,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: TOKEN_EXPIRES_IN,
            }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "發生錯誤", type: "error" });
        console.log("ERROR at controllers/user.js/signin");
        console.log(error);
    }
};

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    const emailLower = email.toLowerCase().replace(/\s/g, "");
    try {
        // Get the user with that email
        const existingUser = await UserModel.findOne({ email: emailLower });
        if (existingUser) {
            console.log("User already exists.");
            return res.status(404).json({ message: "此電子郵件已使用", type: "error" });
        }

        if (!(firstName && lastName && email && password)) {
            console.log("Not fill in all blanks");
            return res.status(404).json({ message: "尚有空格未填寫", type: "error" });
        }

        if (password !== confirmPassword) {
            console.log("Passwords don't match");
            return res.status(400).json({ message: "密碼不一致", type: "error" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await UserModel.create({
            email: emailLower,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
        });

        // email confirmation token
        /*jwt.sign(
            {
                id: newUser._id,
            },
            process.env.EMAIL_SECRET,
            {
                expiresIn: "1h",
            },
            async (err, emailToken) => {
                const url = `${req.protocol}://${req.get("host")}/user/confirmation/${emailToken}`;
                // edit email template
                let template = await readFile("emailTemplates/confirmation/index.html", "utf8");
                const $ = cheerio.load(template);

                $("#confirmation-button").attr("href", url);
                $("#valid-till").text("*認證到期時間：" + dateString(1));

                transporter.sendMail({
                    to: newUser.email,
                    subject: "阿柏教育線上課程網站帳戶認證",
                    html: $.html(),
                });
            }
        );*/

        console.log("Create User Successful");

        res.status(200).json({ message: "註冊成功", type: "success" });
    } catch (error) {
        console.log("ERROR at controllers/user.js/signup");
        console.log(error);
        res.status(500).json({ message: "發生錯誤", type: "error" });
    }
};

export const accountConfirmation = async (req, res) => {
    try {
        const { id } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        if (!id) {
            res.status(404).json({ message: "認證失敗", type: "error" });
        }

        let updatedUser = await UserModel.findById(id);
        if (!updatedUser) {
            res.status(404).json({ message: "此帳號已不存在", type: "error" });
        }
        updatedUser.confirmed = true;
        await UserModel.findByIdAndUpdate(id, updatedUser);
        console.log("成功認證");
        res.redirect("http://localhost:3000/auth");
    } catch (e) {
        res.status(500).json({ message: "認證發生錯誤", type: "error" });
        console.log("ERROR at controllers/user.js/accountConfirmation");
        console.log(error);
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        console.log("getUsers 成功");
        res.status(200).json(users);
    } catch (error) {
        console.log("getUser ERROR");
        res.status(500).json({ message: "發生錯誤", type: "error" });
    }
};
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findByIdAndRemove(id);
        if (!user) {
            res.status(404).json({ message: "此用戶已不存在", type: "error" });
        }
        console.log("deleteUser 成功");
        res.status(200).json({ message: "成功刪除用戶", type: "success" });
    } catch (error) {
        console.log("getUser ERROR");
        res.status(500).json({ message: "發生錯誤", type: "error" });
    }
};

export const upgradeUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "找不到對應的id", type: "error" });
        }

        const updatedUser = { userType: USER.ADMIN, _id: id };

        await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
        console.log("成功更新使用者權限");
        res.status(200).json({ message: "成功更新使用者權限", type: "success" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "發生錯誤", type: "error" });
    }
};

export const downgradeUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "找不到對應的id", type: "error" });
        }

        const updatedUser = { userType: USER.USER, _id: id };

        await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
        console.log("成功降級使用者權限");
        res.status(200).json({ message: "成功降級使用者權限", type: "success" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "發生錯誤", type: "error" });
    }
};
