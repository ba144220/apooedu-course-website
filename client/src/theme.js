import { createTheme } from "@material-ui/core";
import { amber, green } from "@material-ui/core/colors";

export default createTheme({
    mixins: {
        toolbar: {
            minHeight: "54px",
        },
        secondaryToolbar: {
            minHeight: "40px",
        },
    },

    typography: {
        fontFamily: ["Quicksand", "Noto Sans TC"],
        fontWeightLight: 200,
        fontWeightRegular: 300,
        fontWeightMedium: 400,
        fontWeightBold: 500,
    },
    palette: {
        border: "#e8e8e8",
        primary: {
            light: green[300],
            main: green[500],
            dark: green[700],
            deepDark: green[900],
        },
        secondary: {
            light: amber[200],
            main: amber[400],
            dark: amber[600],
            deepDark: amber[900],
        },
        background: {
            default: "#f9f9f9",
        },
    },
});
