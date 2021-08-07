import { ListItem, List, ListItemIcon, ListItemText } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
//import { useDispatch } from "react-redux";
import useStyles from "./styles";

const UserPopoverList = ({ logout, closePopover }) => {
    const classes = useStyles();

    return (
        <List component="nav" aria-label="main mailbox folders" className={classes.list}>
            <ListItem
                button
                onClick={() => {
                    closePopover();
                    logout();
                }}
            >
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText className={classes.text} primary="登出" />
            </ListItem>
        </List>
    );
};

export default UserPopoverList;
