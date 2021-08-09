import { Button, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router";

import { getCodingProblems } from "../../actions/codingProblems";

const useStyles = makeStyles((theme) => ({
    easy: {
        color: "green",
        borderColor: "green",
    },
    medium: {
        color: "orange",
        borderColor: "orange",
    },
    hard: {
        color: "red",
        borderColor: "red",
    },
}));

const Btn = ({ title, difficulty, id }) => {
    const classes = useStyles();
    const history = useHistory();
    const handleOnclick = () => {
        history.push(`/coding-problem/${id}`);
    };
    if (difficulty === "EASY") {
        return (
            <Button variant="outlined" className={classes.easy} onClick={handleOnclick}>
                {title}
            </Button>
        );
    } else if (difficulty === "MEDIUM") {
        return (
            <Button variant="outlined" className={classes.medium} onClick={handleOnclick}>
                {title}
            </Button>
        );
    } else {
        return (
            <Button variant="outlined" className={classes.hard} onClick={handleOnclick}>
                {title}
            </Button>
        );
    }
};

const CodingProblems = () => {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        getCodingProblems().then((data) => {
            console.log(data);
            setProblems(data);
        });
    }, []);

    return (
        <Container>
            {problems &&
                problems.map(({ title, difficulty, _id }) => (
                    <Btn title={title} key={title} difficulty={difficulty} id={_id} />
                ))}
        </Container>
    );
};

export default CodingProblems;
