import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbar({ open, setOpen, msgData }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {msgData?.type && msgData?.message && (
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={() => setOpen(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={() => setOpen(false)} severity={msgData?.type}>
                        {msgData?.message}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}
