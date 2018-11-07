// @flow
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../state/stores/store";
import HomePage from "../pages/HomePage";
import Sidebar from "../components/Sidebar";
import PageNotFound from "../pages/PageNotFound";
import AlertMessage from "../components/AlertMessage";
import { clearWatchPosition, watchPosition, getPosition } from "../../utils/geoLocation";
import {
  setMapCenter,
  setUserLocation,
  setMapZoom,
} from "../../state/actions/mapDisplayActions";

class App extends Component {
  componentDidMount() {
    // set a watch for user's location
    this.watchPositionId = watchPosition((position: Position) => {
      store.dispatch(
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      );
    });

    // once current location obtained, set initial map center and zoom
    getPosition((position: Position) => {
      store.dispatch(
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      );

      store.dispatch(setMapZoom(15));
    });
  }

  componentWillUnmount() {
    clearWatchPosition(this.watchPositionId);
  }

  watchPositionId: number;

  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/sidebar" component={Sidebar} />
              <Route component={PageNotFound} />
            </Switch>
          </BrowserRouter>
        </Provider>
        <AlertMessage />
      </div>
    );
  }
}

export default App;
