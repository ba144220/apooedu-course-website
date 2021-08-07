import React from "react";

import useStyles from "./styles";

import CustomAppbar from "./appbar/appbar";

//import CustomDrawer from "./customDrawer/customDrawer";
//import { Container, Grow, Paper, Typography } from "@material-ui/core";

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
