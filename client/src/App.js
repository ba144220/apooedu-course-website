import React from "react";
import { ThemeProvider, Button } from "@material-ui/core";
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
import Admin from "./containers/Admin/Admin";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/auth" component={Auth} />

                    <Layout>
                        <Switch>
                            <Route exact path="/explore-courses" component={ExploreCourses} />
                            <Route exact path="/my-courses" component={MyCourses} />
                            <Route exact path="/coding-problems" component={CodingProblems} />
                            <Route path="/coding-problem" component={CodingProblem} />
                            <Route exact path="/coding-contests" component={CodingContests} />
                            <Route path="/coding-problem-editor">
                                <CreateCodingProblem />
                            </Route>
                            <Route path="/admin">
                                <Admin />
                            </Route>
                        </Switch>
                    </Layout>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
