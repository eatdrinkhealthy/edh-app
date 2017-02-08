import { configure } from "@kadira/storybook";

const req = require.context("../imports/ui", true, /__stories__\/.*.jsx?/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);