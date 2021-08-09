import React, { useState } from "react";

import { Avatar, Button, Container, Grid, Grow, Paper, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import useStyles from "./styles";
import Input from "./Input";

import { signin, signup } from "../../actions/auth";

import CustomizedSnackbar from "../../components/snackbar";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

function Auth() {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [sub, setSub] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [msgData, setMsgData] = useState("");
    // const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSub(true);
        if (isSignup) {
            const data = await signup(formData, history, () => {
                setIsSignup(false);
            });
            console.log(data);
            setSnackbarOpen(true);
            setMsgData(data);
        } else {
            const data = await signin(formData, history);
            console.log(data);
            setSnackbarOpen(true);
            setMsgData(data);
        }
        setSub(false);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        setIsSignup(!isSignup);
        setShowPassword(false);
    };
    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <>
            <Grow in={true}>
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper} elevation={3}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography variant="h5">{isSignup ? "創建帳號" : "登入"}</Typography>
                        <div className={classes.form}>
                            <Grid container spacing={2}>
                                {isSignup && (
                                    <>
                                        {" "}
                                        <Input
                                            name="lastName"
                                            label="姓氏"
                                            handleChange={handleChange}
                                            half
                                        />
                                        <Input
                                            name="firstName"
                                            label="名字"
                                            handleChange={handleChange}
                                            autoFocus
                                            half
                                        />
                                    </>
                                )}
                                <Input
                                    name="email"
                                    label="電子郵件"
                                    handleChange={handleChange}
                                    tpye="email"
                                />
                                <Input
                                    name="password"
                                    label="密碼"
                                    handleChange={handleChange}
                                    type={showPassword ? "text" : "password"}
                                    handleShowPassword={handleShowPassword}
                                />
                                {isSignup && (
                                    <Input
                                        name="confirmPassword"
                                        label="重複輸入密碼"
                                        handleChange={handleChange}
                                        type="password"
                                    />
                                )}
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                id="auth-submit-btn"
                                onClick={handleSubmit}
                                disabled={sub}
                            >
                                {isSignup ? "創建帳號" : "登入"}
                            </Button>

                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Button onClick={switchMode}>
                                        <Typography color="textSecondary">
                                            {isSignup
                                                ? "已經有帳號了？登入"
                                                : "還沒有帳號？創建帳號"}
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Paper>
                </Container>
            </Grow>
            <CustomizedSnackbar open={snackbarOpen} setOpen={setSnackbarOpen} msgData={msgData} />
        </>
    );
}

export default Auth;
