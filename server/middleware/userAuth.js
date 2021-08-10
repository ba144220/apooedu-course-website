import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// wants to like a post
// click the like button => auth middleware (next) => like controller ...

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        let decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData?.id;
        req.userType = decodedData?.userType;

        next();
    } catch (error) {
        console.log("token is not valid");
        res.status(404).json({ message: "token驗證失敗", type: "error" });
    }
};

export default userAuth;
