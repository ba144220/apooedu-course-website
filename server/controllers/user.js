import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs";
import { promisify } from "util";
import cheerio from "cheerio";

import UserModel from "../models/userModel.js";

const readFile = promisify(fs.readFile);

const TOKEN_EXPIRES_IN = "2h";

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

    try {
        // Get the user with that email
        const existingUser = await UserModel.findOne({ email });

        // Check if the user exist
        if (!existingUser) {
            return res.status(404).json({ message: "使用者不存在" });
        }

        // Check if the user has been confirmed
        if (!existingUser.confirmed) {
            return res.status(404).json({ message: "尚未驗證電子郵件" });
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "密碼錯誤" });
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
        res.status(500).json({ message: "發生錯誤" });
        console.log("ERROR at controllers/user.js/signin");
        console.log(error);
    }
};

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        // Get the user with that email
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            console.log("User already exists.");
            return res.status(404).json({ message: "此電子郵件已使用" });
        }

        if (password !== confirmPassword) {
            console.log("Passwords don't match");
            return res.status(400).json({ message: "密碼不一致" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await UserModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
        });

        // get expire time
        let date_ob = new Date();

        date_ob.setTime(date_ob.getTime() + 60 * 60 * 1000);

        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();
        const expireTime =
            year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        console.log(expireTime);

        // email confirmation token
        jwt.sign(
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
                $("#valid-till").text("*認證到期時間：" + expireTime);

                transporter.sendMail({
                    to: newUser.email,
                    subject: "阿柏教育線上課程網站帳戶認證",
                    html: $.html(),
                });
            }
        );

        console.log("Create User Successful");

        res.status(200).json({ message: "請到電子郵件認證帳號" });
    } catch (error) {
        console.log("ERROR at controllers/user.js/signup");
        console.log(error);
        res.status(500).json({ message: "發生錯誤" });
    }
};

export const accountConfirmation = async (req, res) => {
    try {
        const { id } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        if (!id) {
            res.status(404).json({ message: "認證失敗" });
        }

        let updatedUser = await UserModel.findById(id);
        if (!updatedUser) {
            res.status(404).json({ message: "此帳戶已不存在" });
        }
        updatedUser.confirmed = true;
        await UserModel.findByIdAndUpdate(id, updatedUser);
        console.log("成功認證");
        res.redirect("http://localhost:3000/");
    } catch (e) {
        res.status(500).json({ message: "認證發生錯誤" });
        console.log("ERROR at controllers/user.js/accountConfirmation");
        console.log(error);
    }
};
