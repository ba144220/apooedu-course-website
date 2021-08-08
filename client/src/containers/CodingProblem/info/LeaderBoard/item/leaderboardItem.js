import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Grow from "@material-ui/core/Grow";
import useStyles from "./styles";

import { Typography } from "@material-ui/core";

import StatusChip from "../../../../../components/statusChip";
import dateString from "../../../../../utils/dateString";

const LeaderboardItem = ({ row, index }) => {
    const classes = useStyles(index);

    return (
        <Grow in={true} mountOnEnter unmountOnExit timeout={index > 10 ? 1300 : 300 + 100 * index}>
            <TableRow key={index} className={classes.tableRow}>
                <TableCell align="center">
                    <Avatar className={classes.avatar}>{index + 1}</Avatar>
                </TableCell>
                <TableCell align="center">{row.lastName + row.firstName}</TableCell>
                <TableCell align="center">{row.exeTime.toString()}</TableCell>
                <TableCell align="center">{<StatusChip status={row.status} />}</TableCell>
                <TableCell align="center">
                    <Typography color="textSecondary" style={{ whiteSpace: "pre-wrap" }}>
                        {dateString(row.submittedAt)}
                    </Typography>
                </TableCell>
            </TableRow>
        </Grow>
    );
};

export default LeaderboardItem;
