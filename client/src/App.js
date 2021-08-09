import React from "react";
import { ThemeProvider, Button, Paper, Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import theme from "./theme";

import Auth from "./containers/Auth/Auth";
import Layout from "./containers/Layout/Layout";
import ExploreCourses from "./containers/ExploreCourses/ExploreCourses";
import MyCourses from "./containers/MyCourses/MyCourses";
import CodingProblem from "./containers/CodingProblem/CodingProblem";
import CodingContests from "./containers/CodingContests/CodingContests";
import CreateCodingProblem from "./containers/CodingProblem/create/createCodingProblem";
import CodingProblems from "./containers/CodingProblems/CodingProblems";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/auth" component={Auth} />
                    <Route exact path="/test">
                        <CreateCodingProblem />
                        <Button color="secondary" variant="outlined" onClick={() => console.log()}>
                            TEST
                        </Button>
                    </Route>

                    <Layout>
                        <Switch>
                            <Route exact path="/explore-courses" component={ExploreCourses} />
                            <Route exact path="/my-courses" component={MyCourses} />
                            <Route exact path="/coding-problems" component={CodingProblems} />
                            <Route path="/coding-problem" component={CodingProblem} />
                            <Route exact path="/coding-contests" component={CodingContests} />
                        </Switch>
                    </Layout>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
