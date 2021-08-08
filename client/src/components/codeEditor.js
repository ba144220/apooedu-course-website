import React, { useState } from "react";
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";

//import { useDispatch } from "react-redux";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

//import { createTest } from "../../actions/tests";

const useStyles = makeStyles((theme) => ({
    containerTest: {
        backgroundColor: "yellow",
    },
    submitBtn: {
        margin: theme.spacing(2),
    },
    toolbar: {
        minHeight: theme.mixins.secondaryToolbar.minHeight,
        padding: "0px",
        display: "flex",
        alignContent: "center",
    },

    formControl: {
        maxHeight: theme.mixins.secondaryToolbar.minHeight,
        margin: "0px",
        minWidth: 120,
    },
    select: {
        // maxHeight: theme.mixins.secondaryToolbar.minHeight,
        margin: "0px",
    },
}));

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
            <div className={classes.toolbar}>
                <FormControl className={classes.formControl} disabled>
                    <Select
                        labelId="demo-simple-select-disabled-label"
                        id="demo-simple-select-disabled"
                        value={10}
                        onChange={() => {}}
                        placeholder={"python"}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>python</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <AceEditor
                className={classes.ace}
                style={{
                    width: "100%",
                    margin: "0px",
                    height: "calc(100% - 42px)",
                    border: "1px solid #e8e8e8",
                }}
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
            {/* <Button
                className={classes.submitBtn}
                variant="contained"
                disableElevation
                color="primary"
                endIcon={<PublishRoundedIcon />}
                onClick={() => handleSubmit()}
            >
                繳交程式碼
            </Button> */}
        </>
    );
};

export default CodeEditor;
