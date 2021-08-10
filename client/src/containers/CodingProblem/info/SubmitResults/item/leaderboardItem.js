import React, { useState } from "react";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import useStyles from "./styles";
import {
    TableCell,
    TableRow,
    // Dialog,
    // DialogTitle,
    // DialogActions,
    // Button,
    Grow,
    IconButton,
    Typography,
} from "@material-ui/core";

// import { useDispatch } from "react-redux";

import StatusChip from "../../../../../components/statusChip";
import dateString from "../../../../../utils/dateString";
import { deleteSubmission } from "../../../../../actions/submission";
// import { deleteTest } from "../../../actions/tests";

const LeaderboardItem = ({ row, index, user, edit }) => {
    const classes = useStyles(index);
    // const dispatch = useDispatch();
    //const [open, setOpen] = useState(false);
    const [show, setShow] = useState(true);

    const handleDelete = async () => {
        console.log(row);
        //handleClose();
        setShow(false);
        await deleteSubmission(row._id);

        //     dispatch(deleteTest(row._id));
    };
    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <>
            {show ? (
                <Grow
                    in={true}
                    mountOnEnter
                    unmountOnExit
                    timeout={index > 10 ? 1300 : 300 + 100 * index}
                >
                    <TableRow key={row.userId} className={classes.tableRow}>
                        <TableCell align="center">{row.lastName + row.firstName}</TableCell>
                        <TableCell align="center">{row.exeTime * 1000}</TableCell>
                        <TableCell align="center">{<StatusChip status={row.status} />}</TableCell>
                        <TableCell align="center">
                            <Typography color="textSecondary" style={{ whiteSpace: "pre-wrap" }}>
                                {dateString(row.submittedAt)}
                            </Typography>
                        </TableCell>

                        {user?.result?.userType === "ADMIN" && (
                            <TableCell align="center" variant="footer" className={classes.edit}>
                                <IconButton
                                    onClick={() => {
                                        //setOpen(true);
                                        handleDelete();
                                    }}
                                >
                                    <HighlightOffRoundedIcon />
                                </IconButton>
                            </TableCell>
                        )}
                    </TableRow>
                </Grow>
            ) : null}

            {/* alert dialog */}
            {/* <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">確認刪除此紀錄？</DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        確認
                    </Button>
                </DialogActions>
            </Dialog> */}
        </>
    );
};

export default LeaderboardItem;
