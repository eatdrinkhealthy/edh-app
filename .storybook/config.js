import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import backgrounds from "@storybook/addon-backgrounds";

// NOTE bootstrap.css is included via a link tag in preview-head.html
// NOTE must explicitly import css packages imported in project (or correct webpack config)
import "!style-loader!css-loader!less-loader!../node_modules/react-s-alert/dist/s-alert-default.css";
import "!style-loader!css-loader!less-loader!../node_modules/html-hint/dist/html-hint.css";
import "!style-loader!css-loader!less-loader!../client/stylesheets/main.less";

// load settings as a Meteor application would (for API keys)
Window.Meteor = {};
try {
  Window.Meteor.settings = require("../settings.json");
} catch (e) {
  Window.Meteor.settings = "";
}

addDecorator(withKnobs);
addDecorator(backgrounds([
  { name: "Light Steel Blue", value: "lightsteelblue" },
  { name: "EDH Gradient", value: "-webkit-linear-gradient(-45deg, #048ec5 0%, #2ecc71 100%)" },
]));


const req = require.context("../imports/ui", true, /__stories__\/.*.stories.jsx?/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
