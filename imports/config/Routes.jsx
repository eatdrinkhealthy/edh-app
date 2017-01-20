import React from "react";
import { Router, Route, browserHistory } from "react-router";
import AppContainer from "../ui/containers/AppContainer";
import Sidebar from "../ui/components/Sidebar";
import PageNotFound from "../ui/pages/PageNotFound";
import Filter from "../ui/components/Filter";
import { FilterList } from "../api/filters";

const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer} />
    <Route path="/sidebar" component={Sidebar} />
    <Route path="/filter" component={() => (<Filter filterList={FilterList} />)} />
    <Route path="*" component={PageNotFound} />
  </Router>
);

export default Routes;
