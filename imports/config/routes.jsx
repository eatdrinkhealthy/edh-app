import React from "react";
import { Router, Route, browserHistory } from "react-router";
import AppContainer from "../ui/containers/AppContainer";
import Sidebar from "../ui/components/Sidebar";

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer} />
    <Route path="/sidebar" component={Sidebar} />
  </Router>
);

export default routes;
