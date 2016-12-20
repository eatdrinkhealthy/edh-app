import React from "react";
import { Router, Route, browserHistory } from "react-router";
import AppContainer from "../ui/containers/AppContainer";
import Sidebar from "../ui/components/Sidebar";
import PageNotFound from "../ui/pages/PageNotFound";

const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer} />
    <Route path="/sidebar" component={Sidebar} />
    <Route path="*" component={PageNotFound} />
  </Router>
);

export default Routes;
