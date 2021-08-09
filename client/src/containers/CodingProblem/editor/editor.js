import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useLocation } from "react-router";
import { postSubmission } from "../../../actions/submission";
import CodeEditor from "../../../components/codeEditor";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "red",
        height: "100%",
        position: "relative",
        width: "100%",
    },
    body: {
        backgroundColor: "pink",
        position: "absolute",
        top: "0px",
        bottom: theme.mixins.toolbar.minHeight,
        left: "0px",
        right: "0px",
    },
    footer: {
        backgroundColor: "purple",
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

    const handleSubmit = async () => {
        const id = location.pathname.split("/").reverse()[0];
        const codeData = {
            firstName: user.firstName,
            lastName: user.lastName,
            code: code,
        };
        const result = await postSubmission(id, codeData);
        console.log(result);
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
                    disabled={!user}
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    提交程式碼
                </Button>
            </div>
        </div>
    );
};

export default Editor;
