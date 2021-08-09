import mongoose from "mongoose";
import { USER } from "../constants/constants.js";

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true }, // 名
    lastName: { type: String, required: true }, // 姓
    email: { type: String, required: true },
    phone: { type: String },
    password: { type: String, required: true },
    userType: { type: String, enum: USER, default: USER.USER },
    confirmed: { type: Boolean, required: true, default: true },
    id: { type: String },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

var UserModel = mongoose.model("users", userSchema);
export default UserModel;
