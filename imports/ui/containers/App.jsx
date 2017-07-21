// @flow
import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../data/state/stores/store";
import MapContainer from "./MapContainer";
import Sidebar from "../components/Sidebar";
import FilterListContainer from "./FilterListContainer";
import PageNotFound from "../pages/PageNotFound";
import AlertMessage from "../components/AlertMessage";

const App = (): React$Element<*> => (
  <div>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MapContainer} />
          <Route path="/sidebar" component={Sidebar} />
          <Route path="/filter" component={FilterListContainer} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
    <AlertMessage stack={{ limit: 3 }} />
  </div>
);

export default App;

