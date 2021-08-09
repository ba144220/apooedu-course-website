import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import codingProblemRoutes from "./routes/codingProblems.js";
import userRoutes from "./routes/users.js";
import submissionRoutes from "./routes/submissions.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/coding-problem", codingProblemRoutes);
app.use("/submission", submissionRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello to apooedu-course-website");
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
    )
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
