import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import routes from "../imports/config/routes";

Meteor.startup(() => {
  render(routes, document.getElementById("render-target"));
});
