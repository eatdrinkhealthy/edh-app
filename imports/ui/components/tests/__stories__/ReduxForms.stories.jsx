// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { storiesOf } from "@storybook/react";
import { decorateAction } from "@storybook/addon-actions";
import Provider from "./Provider";
import CreateAccount from "../../CreateAccount";

const actionFirstArg = decorateAction([
  args => args.slice(0, 1),
]);

storiesOf("Redux Forms", module)
  .addDecorator((story: () => React$Element<*>): React$Element<*> => (
    <Provider story={story()} />
  ))
  .add("CreateAccount", (): React$Element<*> => (
    <CreateAccount onSubmit={actionFirstArg("submitted")} />
  ));
