import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import theme from "./theme";

import Auth from "./components/Auth/Auth";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Auth />
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
