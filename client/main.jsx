import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import Routes from "../imports/config/Routes";

Meteor.startup(() => {
  render(Routes, document.getElementById("render-target"));
});
