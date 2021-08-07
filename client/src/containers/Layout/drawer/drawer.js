import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { menuItems } from "../menuItems";
import { useHistory } from "react-router";

const useStyles = makeStyles({
    list: {
        width: 240,
    },
    fullList: {
        width: "auto",
    },
});

export default function TemporaryDrawer({ open, setOpen }) {
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
                    <List>
                        {menuItems.map(({ text, path }) => (
                            <ListItem button key={path} onClick={() => history.push(path)}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </React.Fragment>
    );
}
