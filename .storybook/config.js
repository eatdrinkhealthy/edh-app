import { configure } from "@kadira/storybook";

import "!style!css!less!../client/stylesheets/main.less";
import "!style!css!less!./decorators/centered.css";

// load settings as a Meteor application would (for API keys)
Window.Meteor = {};
try {
  Window.Meteor.settings = require("../settings.json");
} catch (e) {
  Window.Meteor.settings = "";
}

const req = require.context("../imports/ui", true, /__stories__\/.*.stories.jsx?/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
