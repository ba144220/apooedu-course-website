import React, { useEffect } from "react";
import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";

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
        height: theme.mixins.secondaryToolbar.minHeight,
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

const CodeEditor = ({ code, setCode, problem = "", style = null }) => {
    const classes = useStyles();

    useEffect(() => {
        console.log(problem.template);
        setCode(problem.template);
    }, []);

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
                style={style}
                placeholder={"請輸入程式碼"}
                mode="python"
                theme="tomorrow"
                value={code}
                onChange={(c) => setCode(c)}
                fontSize={16}
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
        </>
    );
};

export default CodeEditor;
