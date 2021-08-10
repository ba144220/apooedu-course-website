import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { Container, Grow } from "@material-ui/core";

import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

import Skeleton from "@material-ui/lab/Skeleton";

import { useHistory } from "react-router";

import { USER } from "../../constants/constants";
import { deleteUser, getUsers } from "../../actions/user";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    container: {
        marginTop: theme.spacing(3),
    },
    edit: {
        marginBottom: theme.spacing(0),
        padding: theme.spacing(0),
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export default function BasicTable() {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const [users, setUsers] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getUsers();
            setUsers(data);
        }
        fetchData();
    }, []);
    return (
        <>
            {user?.result?.userType === USER.ADMIN && (
                <Grow in={true}>
                    <Container className={classes.container}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <colgroup>
                                    <col width="30%" />
                                    <col width="30%" />
                                    <col width="30%" />
                                    <col width="10%" />
                                </colgroup>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">姓名</TableCell>
                                        <TableCell align="center">權限</TableCell>
                                        <TableCell align="center">電子郵件</TableCell>
                                        <TableCell align="center">編輯</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users ? (
                                        users.map((row) => (
                                            <TableRow key={row.email} className={classes.tableRow}>
                                                <TableCell align="center">
                                                    {row.lastName + row.firstName}
                                                </TableCell>
                                                <TableCell align="center">{row.userType}</TableCell>
                                                <TableCell align="center">{row.email}</TableCell>
                                                <TableCell
                                                    align="center"
                                                    variant="footer"
                                                    className={classes.edit}
                                                >
                                                    {row.userType !== USER.ADMIN && (
                                                        <IconButton
                                                            onClick={() => {
                                                                deleteUser(row._id);
                                                            }}
                                                        >
                                                            <HighlightOffRoundedIcon />
                                                        </IconButton>
                                                    )}
                                                </TableCell>
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
                    </Container>
                </Grow>
            )}
        </>
    );
}
