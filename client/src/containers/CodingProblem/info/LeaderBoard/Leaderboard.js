import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useStyles from "./styles";

import { useLocation } from "react-router";

import LeaderboardItem from "./item/leaderboardItem";
import { getSubmissions } from "../../../../actions/submission";

const Leaderboard = () => {
    const classes = useStyles();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("profile"));
    const [submissions, setSubmissions] = useState(null);

    useEffect(() => {
        const id = location.pathname.split("/").reverse()[0];
        getSubmissions(id).then((data) => {
            console.log(data);
            let ac_subs = data.payload.filter((sub) => sub.status === 3);
            ac_subs.sort((a, b) => {
                if (a.exeTime === b.exeTime) {
                    let a_time = new Date(a.submittedAt);
                    let b_time = new Date(b.submittedAt);
                    return a_time.getTime() - b_time.getTime();
                }
                return a.exeTime - b.exeTime;
            });
            setSubmissions(ac_subs);
        });
    }, []);

    // useEffect(() => {
    //     dispatch(getTests());
    // }, [dispatch]);

    // homes.sort(
    //     function(a, b) {
    //        if (a.city === b.city) {
    //           // Price is only important when cities are the same
    //           return b.price - a.price;
    //        }
    //        return a.city > b.city ? 1 : -1;
    //     });

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
                    {submissions
                        ? submissions.map((row, index) => (
                              <LeaderboardItem row={row} index={index} key={row._id} user={user} />
                          ))
                        : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Leaderboard;
