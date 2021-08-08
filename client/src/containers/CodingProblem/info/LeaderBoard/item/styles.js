import { makeStyles } from "@material-ui/core/styles";
import { grey, amber, brown } from "@material-ui/core/colors";
export default makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "row",
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        alignItems: "center",
    },

    avatar: {
        margin: "auto",
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
    edit: {
        marginBottom: theme.spacing(0),
        padding: theme.spacing(0),
    },
    editTextField: {},
}));
