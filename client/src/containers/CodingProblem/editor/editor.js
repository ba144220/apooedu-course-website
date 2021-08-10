import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useLocation } from "react-router";
import { postSubmission } from "../../../actions/submission";
import CodeEditor from "../../../components/codeEditor";
import CustomizedSnackbar from "../../../components/snackbar";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "transparent",
        height: "100%",
        position: "relative",
        width: "100%",
    },
    body: {
        backgroundColor: "transparent",
        position: "absolute",
        top: "0px",
        bottom: theme.mixins.toolbar.minHeight,
        left: "0px",
        right: "0px",
    },
    footer: {
        backgroundColor: "transparent",
        height: theme.mixins.toolbar.minHeight,
        position: "absolute",
        bottom: "0px",
        left: "0px",
        right: "0px",

        display: "flex",
        //justifyContent: "center",
        alignContent: "center",
    },
    submit: {
        margin: "auto",
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        //backgroundColor: theme.palette.secondary.deepDark,
    },
    run: {
        margin: "auto",
        marginRight: theme.spacing(2),
        //backgroundColor: theme.palette.secondary.deepDark,
    },
}));

const Editor = ({ problem }) => {
    const classes = useStyles();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [code, setCode] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [msgData, setMsgData] = useState("");
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async () => {
        setDisabled(true);
        const id = location.pathname.split("/").reverse()[0];
        const codeData = {
            code: code,
        };
        const result = await postSubmission(id, codeData);
        setMsgData(result);
        setSnackbarOpen(true);
        setDisabled(false);
    };

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                {problem ? (
                    <CodeEditor
                        code={code}
                        setCode={setCode}
                        problem={problem}
                        style={{
                            width: "calc(100% - 2px)",
                            margin: "0px",
                            height: "calc(100% - 42px)",
                            border: "1px solid #e8e8e8",
                        }}
                    />
                ) : (
                    <p>running...</p>
                )}
            </div>
            <div className={classes.footer}>
                <Button variant="outlined" color="secondary" disabled className={classes.run}>
                    ＞ 測試程式碼
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    disabled={!user || disabled}
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    提交程式碼
                </Button>
            </div>
            <CustomizedSnackbar open={snackbarOpen} setOpen={setSnackbarOpen} msgData={msgData} />
        </div>
    );
};

export default Editor;
