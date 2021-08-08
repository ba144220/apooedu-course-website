import React, { useState, useEffect } from "react";

import {
    AppBar,
    Avatar,
    Button,
    Toolbar,
    Typography,
    Popover,
    Divider,
    IconButton,
    Link,
} from "@material-ui/core";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { useMediaQuery } from "@material-ui/core";

import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import useStyles from "./styles";

import { USER } from "../../../constants/constants";
import UserPopoverList from "../userPopoverList/userPopoverList";
import CustomDrawer from "../drawer/drawer";
import TemporaryDrawer from "../drawer/drawer";
import ApooEduLogo from "../../../components/apooeduLogo";
import { menuItems } from "../menuItems";

const Appbar = (props) => {
    const classes = useStyles();
    //const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [openDrawer, setOpenDrawer] = useState(false);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const logout = () => {
        //dispatch({ type: "LOGOUT" });
        //history.push("/auth");
        localStorage.clear();
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
        // JWT ...
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
        // eslint-disable-next-line
    }, [location]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            <TemporaryDrawer open={openDrawer} setOpen={setOpenDrawer}></TemporaryDrawer>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.toolbar}>
                    {isSmallScreen && (
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="primary"
                            aria-label="menu"
                            onClick={() => setOpenDrawer(true)}
                        >
                            <MenuRoundedIcon color="primary" />
                        </IconButton>
                    )}

                    <ApooEduLogo />

                    {!isSmallScreen ? (
                        <div style={{ margin: "auto", marginLeft: "15px" }}>
                            {menuItems.map(({ text, path, active }) => (
                                <Button
                                    variant="text"
                                    onClick={() => history.push(path)}
                                    disableRipple
                                    className={classes.textBtn}
                                    key={text}
                                    //color="primary"
                                    //disabled={!active}
                                >
                                    {text}
                                </Button>
                            ))}
                        </div>
                    ) : (
                        <div style={{ margin: "auto", marginLeft: "15px" }}></div>
                    )}

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        className={classes.popover}
                    >
                        <UserPopoverList logout={logout} closePopover={handleClose} />
                    </Popover>
                    {/* <Divider className={classes.divider} orientation="vertical" flexItem /> */}
                    <div className={classes.userInfo}>
                        {user ? (
                            <Button
                                className={classes.userInfoBtn}
                                onClick={handleClick}
                                aria-describedby={id}
                                color="primary"
                            >
                                <Avatar
                                    className={
                                        user?.result?.userType === USER.ADMIN
                                            ? classes.avatarAdmin
                                            : classes.avatarStudent
                                    }
                                >
                                    {user?.result?.lastName}
                                </Avatar>
                                <Typography className={classes.name}>
                                    {user?.result?.lastName + user?.result?.firstName}
                                </Typography>
                                {open ? (
                                    <ExpandLessRoundedIcon style={{ marginLeft: "10px" }} />
                                ) : (
                                    <ExpandMoreRoundedIcon style={{ marginLeft: "10px" }} />
                                )}
                            </Button>
                        ) : (
                            <Button
                                variant="outlined"
                                className={classes.loginBtn}
                                onClick={() => history.push("/auth")}
                                color="primary"
                            >
                                {isSmallScreen ? "登入" : "登入/註冊帳號"}
                            </Button>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Appbar;
