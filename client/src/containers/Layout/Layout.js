import React from "react";

import CustomAppbar from "./appbar/appbar";

//import CustomDrawer from "./customDrawer/customDrawer";
//import { Container, Grow, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    page: {
        backgroundColor: "rgba(0,0,0,0)",
        width: "100%",
        margin: "0",
        padding: "0px",
        [theme.breakpoints.up("sm")]: {
            height: "100%",
        },
    },

    root: {
        display: "flex",
        height: "100%",
    },

    toolbar: theme.mixins.toolbar,
}));

const Layout = ({ children }) => {
    const classes = useStyles();
    //const [user] = useState(JSON.parse(localStorage.getItem("profile")));

    return (
        <div className={classes.root}>
            {/* app bar */}
            <CustomAppbar />

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    );
};

export default Layout;
