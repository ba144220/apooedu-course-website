import { createTheme } from "@material-ui/core";

export default createTheme({
    mixins: {
        toolbar: {
            minHeight: "54px",
        },
    },

    typography: {
        fontFamily: "Noto Sans TC",
        fontWeightLight: 200,
        fontWeightRegular: 300,
        fontWeightMedium: 400,
        fontWeightBold: 500,
    },
});
