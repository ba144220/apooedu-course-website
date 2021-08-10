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

// import { getTests } from "../../actions/tests";
// import { useDispatch, useSelector } from "react-redux";
import LeaderboardItem from "./item/leaderboardItem";
import { getSubmissions } from "../../../../actions/submission";

const SubmitResults = () => {
    const classes = useStyles();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("profile"));
    const [submissions, setSubmissions] = useState(null);

    useEffect(() => {
        const id = location.pathname.split("/").reverse()[0];
        getSubmissions(id).then((data) => {
            console.log(data);
            setSubmissions(data.payload);
        });
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                {user?.result?.userType === "ADMIN" ? (
                    <colgroup>
                        <col width="20%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="30%" />
                        <col width="10%" />
                    </colgroup>
                ) : (
                    <colgroup>
                        <col width="17%" />
                        <col width="17%" />
                        <col width="17%" />
                        <col width="32%" />
                    </colgroup>
                )}
                <TableHead>
                    <TableRow>
                        <TableCell align="center">姓名</TableCell>
                        <TableCell align="center">執行時間&nbsp;(ms)</TableCell>
                        <TableCell align="center">狀態</TableCell>
                        <TableCell align="center">繳交時間</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {submissions !== null
                        ? submissions
                              .slice()
                              .reverse()
                              .map((row, index) => (
                                  <LeaderboardItem
                                      row={row}
                                      index={index}
                                      key={row._id}
                                      user={user}
                                  />
                              ))
                        : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SubmitResults;
