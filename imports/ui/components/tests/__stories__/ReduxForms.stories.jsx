// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf } from "@storybook/react";
import { decorateAction } from "@storybook/addon-actions";
import Provider from "./Provider";
import CreateAccountForm from "../../CreateAccountForm";
import LoginForm from "../../LoginForm";

const actionFirstArg = decorateAction([args => [JSON.stringify(args.slice(0, 1)[0])]]);

storiesOf("Redux Forms", module)
  .addDecorator(
    (story: () => React$Element<*>): React$Element<*> => <Provider story={story()} />,
  )
  .add(
    "CreateAccountForm",
    (): React$Element<*> => <CreateAccountForm onSubmit={actionFirstArg("submitted")} />,
  )
  .add("LoginForm", () => <LoginForm onSubmit={actionFirstArg("submitted")} />);
