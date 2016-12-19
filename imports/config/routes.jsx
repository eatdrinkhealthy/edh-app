import React from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import AppContainer from "../ui/containers/AppContainer";

const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer} />
  </Router>
);

export default Routes;
