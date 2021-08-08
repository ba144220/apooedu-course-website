import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// wants to like a post
// click the like button => auth middleware (next) => like controller ...

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        let decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData?.id;
        req.userType = decodedData?.userType;

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
