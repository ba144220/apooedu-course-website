import { amber, green, teal } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const USER_INFO_WIDTH = "190px";
const USER_INFO_WIDTH_SM = "100px";

export default makeStyles((theme) => ({
    appbar: {
        //width: `calc(100% - ${drawerWidth}px)`,
        width: "100%",
        borderBottom: `1px solid ${theme.palette.border}`,
        backgroundColor: "white",
    },
    toolbar: {
        padding: "0px",
    },
    menuButton: {
        marginLeft: theme.spacing(0.5),
        marginRight: "0px",
    },
    userInfo: {
        width: USER_INFO_WIDTH,
        [theme.breakpoints.down("sm")]: {
            width: USER_INFO_WIDTH_SM,
        },
        height: theme.mixins.toolbar.height,
        display: "flex",
        alignSelf: "stretch",
        justifyContent: "center",
    },
    textBtn: {
        minWidth: "0px",
        marginLeft: "10px",
        marginRight: "10px",
        backgroundColor: "none",
        color: theme.palette.primary.dark,
        opacity: 0.8,
        transition: "0.2s",
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "transparent",
            color: theme.palette.primary.deepDark,
            opacity: 1,
        },
    },
    userInfoBtn: {
        display: "flex",
        justifyContent: "center",
        borderRadius: "0px",
        width: "100%",

        color: theme.palette.primary.deepDark,
        // paddingLeft: theme.spacing(3),
        // paddingRight: theme.spacing(3),
    },

    avatarAdmin: {
        backgroundColor: amber[700],
    },
    avatarStudent: {
        backgroundColor: green[400],
    },
    name: {
        margin: "auto",
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(0),
        fontWeight: "normal",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },

    loginBtn: {
        margin: "auto",
    },
    containerTest: {
        backgroundColor: "blue",
    },
}));
