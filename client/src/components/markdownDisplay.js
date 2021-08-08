import React from "react";

import MDEditor from "@uiw/react-md-editor";
import { Container, makeStyles } from "@material-ui/core";

const CodingProblem = {
    _id: "qwertyuiop",
    createdAt: "2021/8/8",
    title: "哈囉世界",
    markdown:
        "## 題目 \n ```python \n print('hello')\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nprint('hello')\nprint('hello')\nprint('hello')\nprint('hello')\nprint('hello')\nprint('hello')\nprint('hello')\nprint('hello')\nprint('hello')\nprint('hello')\nprint('hello')\n```",
};

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
        textAlign: "left",
        maxHeight: "100%",
        overflow: "scroll",
    },
}));

export default function MarkdownDisplay() {
    const [value, setValue] = React.useState(CodingProblem.markdown);
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <h3>題目哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h3>
            <MDEditor.Markdown source={value} />
            <button onClick={() => console.log(value)}>TEST</button>
        </Container>
    );
}
