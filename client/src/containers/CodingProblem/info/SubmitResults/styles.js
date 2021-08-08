import { amber, grey, brown } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    containerTest: {
        backgroundColor: "purple",
    },
    table: {
        minWidth: 650,
    },
    avatar: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: (index) => {
            if (index === 0) {
                return amber[500];
            } else if (index === 1) {
                return grey[400];
            } else if (index === 2) {
                return brown[500];
            } else {
                return "white";
            }
        },
        color: (index) => {
            if (index === 0) {
                return "white";
            } else if (index === 1) {
                return "white";
            } else if (index === 2) {
                return "white";
            } else {
                return grey[700];
            }
        },
    },
}));
