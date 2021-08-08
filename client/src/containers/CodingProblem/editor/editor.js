import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
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

const Editor = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <CodeEditor />
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
                >
                    提交程式碼
                </Button>
            </div>
        </div>
    );
};

export default Editor;
