import React from "react";
import { Router, Route, browserHistory } from "react-router";
import AppContainer from "../ui/containers/AppContainer";
import Sidebar from "../ui/components/Sidebar";
import PageNotFound from "../ui/pages/PageNotFound";
import Filter from "../ui/components/Filter";

const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer} />
    <Route path="/sidebar" component={Sidebar} />
    <Route path="/filter" component={Filter} />
    <Route path="*" component={PageNotFound} />
  </Router>
);

export default Routes;
