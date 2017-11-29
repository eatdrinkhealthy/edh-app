// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs";
import CenterWrapper from "../../../../../.storybook/decorators/CenterWrapper";
import Pin from "../../Pin";

storiesOf("Map", module)
  .add("Pin", () => (
    <CenterWrapper
      width="50%"
      height="50%"
      childrenBorder={boolean("Children Border", false)}
      hasBorder={boolean("Parent Border", false)}
      background={
        select(
          "Parent Background",
          { transparent: "transparent", lightblue: "lightblue", white: "white" },
          "transparent",
        )
      }
    >
      <Pin />
    </CenterWrapper>
  ));
