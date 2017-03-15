import React from "react";
import {
  Router,
  Route,
  browserHistory,
} from "react-router";
import { Provider } from "react-redux";
import store from "../data/state/stores/store";
import App from "../ui/containers/App";
import Sidebar from "../ui/components/Sidebar";
import PageNotFound from "../ui/pages/PageNotFound";
import FilterContainer from "../ui/containers/FilterContainer";

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/sidebar" component={Sidebar} />
      <Route path="/filter" component={FilterContainer} />
      <Route path="*" component={PageNotFound} />
    </Router>
  </Provider>
);

export default Routes;
