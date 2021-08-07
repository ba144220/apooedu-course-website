import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { green } from "@material-ui/core/colors";

const TABS_HEIGHT = "40px";

const AntTabs = withStyles((theme) => ({
    indicator: {
        backgroundColor: theme.palette.background.paper,
    },
    root: {
        minHeight: TABS_HEIGHT,
    },
}))(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: "none",
        minWidth: "20%",
        minHeight: TABS_HEIGHT,
        borderBottom: "1px solid #e8e8e8",
        backgroundColor: theme.palette.background.default,

        "&:hover": {
            color: green[300],

            opacity: 1,
        },
        "&$selected": {
            color: green[500],
            backgroundColor: "white",
            fontWeight: theme.typography.fontWeightMedium,

            borderLeft: "1px solid #e8e8e8",
            borderRight: "1px solid #e8e8e8",
            borderBottom: "none",
        },
        "&:focus": {
            backgroundColor: "white",
            color: green[500],
            borderLeft: "1px solid #e8e8e8",
            borderRight: "1px solid #e8e8e8",
            borderBottom: "none",
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
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
            className={classes.tabPanel}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
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
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,

        height: "100%",
    },
    tabPanel: {
        backgroundColor: "white",
        height: `calc(100% - ${TABS_HEIGHT} )`,
        borderRight: "1px solid #e4e4e4",
    },
}));

export default function Info() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" elevation="0" className={classes.appbar}>
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
                    <AntTab
                        disableRipple
                        label="題目說明"
                        {...a11yProps(0)}
                        className={classes.tab}
                    />
                    <AntTab disableRipple label="解答" {...a11yProps(1)} className={classes.tab} />
                    <AntTab
                        disableRipple
                        label="討論區"
                        {...a11yProps(2)}
                        className={classes.tab}
                    />
                    <AntTab
                        disableRipple
                        label="提交紀錄"
                        {...a11yProps(3)}
                        className={classes.tab}
                    />
                    <AntTab
                        disableRipple
                        label="排行榜"
                        {...a11yProps(4)}
                        className={classes.tab}
                    />
                </AntTabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                題目說明
            </TabPanel>
            <TabPanel value={value} index={1}>
                解答
            </TabPanel>
            <TabPanel value={value} index={2}>
                討論區
            </TabPanel>
            <TabPanel value={value} index={3}>
                提交紀錄
            </TabPanel>
            <TabPanel value={value} index={4}>
                排行榜
            </TabPanel>
        </div>
    );
}
