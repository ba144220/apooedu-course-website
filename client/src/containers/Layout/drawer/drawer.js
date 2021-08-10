import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { menuItems } from "../menuItems";
import { useHistory } from "react-router";
import ApooEduLogo from "../../../components/apooeduLogo";
import { USER } from "../../../constants/constants";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 240,
    },
    btn: {
        fontWeight: "bold",
        color: theme.palette.primary.deepDark,
    },
    toolbar: {
        minHeight: theme.mixins.toolbar.minHeight,
        display: "flex",

        alignContent: "center",
        paddingLeft: theme.spacing(1),
    },
}));

export default function TemporaryDrawer({ open, setOpen, user }) {
    const classes = useStyles();
    const history = useHistory();
    return (
        <React.Fragment>
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
                <div
                    className={classes.list}
                    role="presentation"
                    onKeyDown={() => setOpen(false)}
                    onClick={() => setOpen(false)}
                >
                    <div className={classes.toolbar}>
                        <ApooEduLogo />
                    </div>
                    <Divider />

                    <List>
                        {menuItems.map(({ text, path, active, admin }) => (
                            <>
                                {!admin || user?.result?.userType === USER.ADMIN ? (
                                    <ListItem
                                        button
                                        key={path}
                                        onClick={() => history.push(path)}
                                        className={classes.btn}
                                        disabled={!active}
                                    >
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ) : (
                                    <div></div>
                                )}
                            </>
                        ))}
                    </List>
                </div>
            </Drawer>
        </React.Fragment>
    );
}
