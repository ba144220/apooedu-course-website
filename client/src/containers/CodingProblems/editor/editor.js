import React, { useState } from "react";
import { Button, Container } from "@material-ui/core";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import useStyles from "./styles";

//import { useDispatch } from "react-redux";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

//import { createTest } from "../../actions/tests";

const CodeEditor = () => {
    const classes = useStyles();
    //   const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));

    const [testData, setTestData] = useState({
        code: "def add(a,b):\n    #todos \n\n    return",
    });

    const handleSubmit = async () => {
        // dispatch(
        //     createTest({
        //         ...testData,
        //         lastName: user?.result?.lastName,
        //         firstName: user?.result?.firstName,
        //     })
        // );
    };

    return (
        <>
            <AceEditor
                style={{ width: "100%" }}
                placeholder={"請輸入程式碼"}
                mode="python"
                theme="tomorrow"
                value={testData.code}
                onChange={(c) => setTestData({ ...testData, code: c })}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
            />
            <Button
                className={classes.submitBtn}
                variant="contained"
                disableElevation
                color="primary"
                endIcon={<PublishRoundedIcon />}
                onClick={() => handleSubmit()}
            >
                繳交程式碼
            </Button>
        </>
    );
};

export default CodeEditor;
