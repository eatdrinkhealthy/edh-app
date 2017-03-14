import React from "react";
import { Router, Route, browserHistory } from "react-router";
import LayoutContainer from "../ui/containers/LayoutContainer";
import Sidebar from "../ui/components/Sidebar";
import PageNotFound from "../ui/pages/PageNotFound";
import FilterContainer from "../ui/containers/FilterContainer";

const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={LayoutContainer} />
    <Route path="/sidebar" component={Sidebar} />
    <Route path="/filter" component={FilterContainer} />
    <Route path="*" component={PageNotFound} />
  </Router>
);

export default Routes;
