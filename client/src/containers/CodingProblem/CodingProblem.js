import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Info from "./info/info";
import { Container, Fade, Grow } from "@material-ui/core";
import MarkdownDisplay from "../../components/markdownDisplay";
import Editor from "./editor/editor";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: "0px",
        [theme.breakpoints.up("sm")]: {
            height: `calc(100% - ${theme.mixins.toolbar.minHeight})`,
        },
        width: "100%",
    },
    gridContainer: {
        height: "100%",
    },
    containerLeft: {
        height: "100%",
        padding: "0px",
        [theme.breakpoints.up("sm")]: {
            paddingRight: `5px`,
        },
    },
    containerRight: {
        height: "100%",
        padding: "0px",
        [theme.breakpoints.up("sm")]: {
            paddingLeft: `5px`,
        },
        //backgroundColor: theme.palette.background.default,
        backgroundColor: "green",
    },

    paper: {
        padding: "0px",
        height: "100%",
        textAlign: "center",
        borderRadius: "0px",
        color: theme.palette.text.secondary,
        //backgroundColor: theme.palette.background.default,
        backgroundColor: "blue",
    },
}));

export default function CodingProblem() {
    const classes = useStyles();

    return (
        <Fade in={true}>
            <div className={classes.root}>
                <Grid container spacing={0} className={classes.gridContainer}>
                    <Grid item xs={12} sm={12} md={6} className={classes.item}>
                        <Paper className={classes.paper} elevation={0}>
                            <Container className={classes.containerLeft}>
                                <Info />
                            </Container>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper} elevation={0}>
                            <Container className={classes.containerRight}>
                                <Editor />
                            </Container>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Fade>
    );
}
