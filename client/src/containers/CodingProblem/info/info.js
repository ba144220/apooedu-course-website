import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import MarkdownDisplay from "../../../components/markdownDisplay";
import { Button, Paper } from "@material-ui/core";
import Leaderboard from "./LeaderBoard/Leaderboard";
import SubmitResults from "./SubmitResults/SubmitResults";
import { useHistory, useLocation } from "react-router";
import { deleteCodingProblem } from "../../../actions/codingProblems";

const AntTabs = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,

        minHeight: theme.mixins.secondaryToolbar.minHeight,
    },
}))(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: "none",
        minWidth: "15%",
        minHeight: theme.mixins.secondaryToolbar.minHeight,
        borderBottom: `1px solid ${theme.palette.border}`,
        backgroundColor: theme.palette.background.default,
        transition: "color 0.2s",
        color: "#666666",
        "&:hover": {
            color: theme.palette.secondary.main,
            opacity: 1,
        },
        "&$selected": {
            color: theme.palette.secondary.dark,
            backgroundColor: "white",
            fontWeight: theme.typography.fontWeightMedium,

            borderLeft: `1px solid ${theme.palette.border}`,
            borderRight: `1px solid ${theme.palette.border}`,
            borderBottom: "1px solid #ffffff",
        },
        "&:focus": {
            color: theme.palette.secondary.dark,
            backgroundColor: "white",
            borderLeft: `1px solid ${theme.palette.border}`,
            borderRight: `1px solid ${theme.palette.border}`,
            borderBottom: "1px solid #ffffff",
        },
        "&:disabled": {
            opacity: 0.7,
            color: "#bbbbbb",
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
            className={classes.tabPanel}
        >
            {value === index && (
                <Box p={0} className={classes.box}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    rootForTab: {
        flexGrow: 1,
        width: "100%",

        backgroundColor: theme.palette.background.default,
        height: "100%",
    },
    root: {
        backgroundColor: "yellow",
        height: "100%",
        position: "relative",
    },
    tabPanel: {
        backgroundColor: "green",
        height: `calc(100% + -${theme.mixins.secondaryToolbar.minHeight} )`,
        borderRight: `1px solid ${theme.palette.border}`,
        borderBottom: `1px solid ${theme.palette.border}`,
        position: "relative",
        overflow: "scroll",
    },
    box: {
        height: `100%`,
        margin: "0px",
    },
    paper: {
        height: "100%",
        width: "100%",
        position: "absolute",
        left: "0",
        top: "0",
        borderRadius: "0",
    },

    tabDisabled: {
        minWidth: `25%`,
        borderBottom: `1px solid ${theme.palette.border}`,
    },
    body: {
        backgroundColor: "pink",
        position: "absolute",
        top: "0px",
        bottom: theme.mixins.toolbar.minHeight,
        left: "0px",
        right: "0px",
    },
    footer: {
        backgroundColor: "purple",
        height: theme.mixins.toolbar.minHeight,
        position: "absolute",
        bottom: "0px",
        left: "0px",
        right: "0px",

        display: "flex",

        //justifyContent: "center",
        alignContent: "center",
    },
    submit: {
        margin: "auto",
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        //backgroundColor: theme.palette.secondary.deepDark,
    },
}));

export default function Info({ problem }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [value, setValue] = useState(0);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = () => {
        const id = location.pathname.split("/").reverse()[0];
        history.push(`/test/${id}`);
    };
    const handleDelete = () => {
        const id = location.pathname.split("/").reverse()[0];
        deleteCodingProblem(id);
        history.push("/");
    };

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <div className={classes.rootForTab}>
                    <AppBar
                        position="static"
                        color="default"
                        elevation={0}
                        className={classes.appbar}
                    >
                        <AntTabs
                            value={value}
                            onChange={handleChange}
                            variant="standard"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                            TabIndicatorProps={{
                                style: {
                                    display: "none",
                                },
                            }}
                        >
                            <AntTab disableRipple label="題目說明" {...a11yProps(0)} />
                            <AntTab disableRipple label="解答" {...a11yProps(1)} disabled />
                            <AntTab disableRipple label="討論區" {...a11yProps(2)} disabled />
                            <AntTab disableRipple label="提交紀錄" {...a11yProps(3)} />
                            <AntTab disableRipple label="排行榜" {...a11yProps(4)} />
                            <AntTab
                                disableRipple
                                label=""
                                {...a11yProps(4)}
                                className={classes.tabDisabled}
                                disabled
                            />
                        </AntTabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <Paper elevation={0} className={classes.paper}>
                            <MarkdownDisplay problem={problem} />
                        </Paper>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        解答
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        討論區
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Paper elevation={0} className={classes.paper}>
                            <SubmitResults />
                        </Paper>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <Paper elevation={0} className={classes.paper}>
                            <Leaderboard />
                        </Paper>
                    </TabPanel>
                </div>
            </div>
            <div className={classes.footer}>
                {user?.result?.userType === "ADMIN" ? (
                    <>
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            修改題目
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={handleDelete}
                        >
                            刪除
                        </Button>
                    </>
                ) : null}
            </div>
        </div>
    );
}
