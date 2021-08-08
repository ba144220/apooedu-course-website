import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useStyles from "./styles";

import LeaderboardItem from "./item/leaderboardItem";

//import { getTests } from "../../actions/tests";
//import { useDispatch, useSelector } from "react-redux";

const tests = [
    {
        _id: "610fef8f02fc4f808c4e52e5",
        submittedAt: 1627887784941,
        code: "    return 10",
        lastName: "徐",
        firstName: "有齊",
        creator: "6106d249d505895c0209b249",
        exeTime: "0.0030994415283203125",
        status: "NA",
        __v: {
            $numberInt: "0",
        },
    },
    {
        _id: "610fefd202fc4f808c4e52e6",
        submittedAt: 1627887784941,
        code: "    return a+b",
        lastName: "徐",
        firstName: "有齊",
        creator: "6106d249d505895c0209b249",
        exeTime: "0.00286102294921875",
        status: "AC",
        __v: {
            $numberInt: "0",
        },
    },
    {
        _id: "610fefe602fc4f808c4e52e7",
        submittedAt: 1627912872053,
        code: "def add(a,b):\n\t#todos \n\n\treturn a",
        lastName: "徐",
        firstName: "有齊",
        creator: "6106d249d505895c0209b249",
        exeTime: "0",
        status: "RTE",
        __v: {
            $numberInt: "0",
        },
    },
];

const Leaderboard = () => {
    const classes = useStyles();
    // const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));
    // const tests = useSelector((state) => state.tests);

    // useEffect(() => {
    //     dispatch(getTests());
    // }, [dispatch]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <colgroup>
                    <col width="17%" />
                    <col width="17%" />
                    <col width="17%" />
                    <col width="17%" />
                    <col width="32%" />
                </colgroup>

                <TableHead>
                    <TableRow>
                        <TableCell align="center">排名</TableCell>
                        <TableCell align="center">姓名</TableCell>
                        <TableCell align="center">執行時間&nbsp;(ms)</TableCell>
                        <TableCell align="center">狀態</TableCell>
                        <TableCell align="center">繳交時間</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tests.map((row, index) => (
                        <LeaderboardItem row={row} index={index} key={row._id} user={user} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Leaderboard;
