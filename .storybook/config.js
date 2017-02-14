import { configure } from "@kadira/storybook";

import "!style!css!less!../client/stylesheets/main.less";

const req = require.context("../imports/ui", true, /__stories__\/.*.stories.jsx?/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
