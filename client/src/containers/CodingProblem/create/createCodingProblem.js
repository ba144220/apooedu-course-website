import React from "react";
import Button from "@material-ui/core/Button";
import { createCodingProblem } from "../../../actions/codingProblems";

const testProblem = {
    title: "Add Two Numbers",
    difficulty: "EASY",
    markdown:
        "完成下列函式，達成將兩個數字相加的功能 \n ```python \ndef add(a,b):\n    #todos\n\n    return\n```",
    template: "def add(a,b):\n    #todos\n\n    return",
    judge: "if 8==add(3,5):\n    print('|AC')\nelse:\n    print('|NA')",
};

const CreateCodingProblem = () => {
    const handleOnclick = () => {
        createCodingProblem(testProblem).then((data) => console.log(data));
    };
    return <Button onClick={handleOnclick}>Create Coding Problem</Button>;
};

export default CreateCodingProblem;
