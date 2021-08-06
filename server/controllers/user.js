import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/userModel.js";

const TOKEN_EXPIRES_IN = "2h";

dotenv.config();

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Get the user with that email
        const existingUser = await User.findOne({ email });

        // Check if the user exist
        if (!existingUser) {
            return res.status(404).json({ message: "使用者不存在" });
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
            process.env.SECRET,
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
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists.");
            return res.status(404).json({ message: "此電子郵件已使用" });
        }

        if (password !== confirmPassword) {
            console.log("Passwords don't match");
            return res.status(400).json({ message: "密碼不一致" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
        });

        // Give the token
        const token = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser._id,
                userType: existingUser.userType,
            },
            process.env.SECRET,
            {
                expiresIn: TOKEN_EXPIRES_IN,
            }
        );
        console.log("Create User Successful");
        res.status(200).json({ result: newUser, token });
    } catch (error) {
        res.status(500).json({ message: "發生錯誤" });
    }
};
