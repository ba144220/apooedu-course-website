import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Container, Grow } from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";

import { useHistory } from "react-router";

import { getCodingProblems } from "../../actions/codingProblems";
import { USER } from "../../constants/constants";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    container: {
        marginTop: theme.spacing(3),
    },
    tableRow: {
        transition: "0.5s",
        "&:hover": {
            "& td": {
                fontWeight: "bolder",
                color: theme.palette.secondary.dark,
            },
            color: theme.palette.primary.light,
            cursor: "pointer",
        },
        "& td": {
            fontWeight: "light",
        },
    },
    newProb: {
        marginTop: theme.spacing(2),
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export default function BasicTable() {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const [problems, setProblems] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getCodingProblems();
            setProblems(data);
        }
        fetchData();
    }, []);
    return (
        <Grow in={true}>
            <Container className={classes.container}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <colgroup>
                            <col width="60%" />
                            <col width="40%" />
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">標題</TableCell>
                                <TableCell align="center">難度</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {problems ? (
                                problems.map((row) => (
                                    <TableRow
                                        key={row.title}
                                        onClick={() => {
                                            history.push(`/coding-problem/${row._id}`);
                                        }}
                                        className={classes.tableRow}
                                    >
                                        <TableCell align="center">{row.title}</TableCell>
                                        <TableCell align="center">{row.difficulty}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell align="center">
                                        <Skeleton variant="rect" animation="wave" />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Skeleton variant="rect" animation="wave" />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {user?.result?.userType === USER.ADMIN && (
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.newProb}
                        onClick={() => history.push("/coding-problem-editor/create")}
                    >
                        新增題目
                    </Button>
                )}
            </Container>
        </Grow>
    );
}
