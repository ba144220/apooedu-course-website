// wants to like a post
// click the like button => auth middleware (next) => like controller ...

import { USER } from "../constants/constants.js";

const userAuth = async (req, res, next) => {
    try {
        if (req.userType !== USER.ADMIN) {
            throw "非admin";
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "非admin", type: "error" });
    }
};

export default userAuth;
