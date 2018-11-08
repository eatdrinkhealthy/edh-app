// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf } from "@storybook/react";
import PageNotFound from "../../PageNotFound";

storiesOf("Pages", module).add(
  "Page Not Found",
  (): React$Element<*> => <PageNotFound />,
);
