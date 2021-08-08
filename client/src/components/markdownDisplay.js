import React from "react";

import MDEditor from "@uiw/react-md-editor";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
        textAlign: "left",
        maxHeight: "100%",
        overflow: "scroll",
    },
}));

export default function MarkdownDisplay({ problem }) {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            {problem ? <h3>{problem.title}</h3> : <p>running...</p>}
            {problem ? <MDEditor.Markdown source={problem.markdown} /> : <p>running...</p>}
        </Container>
    );
}
