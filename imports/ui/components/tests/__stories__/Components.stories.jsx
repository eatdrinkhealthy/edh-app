// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf, action } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import CenterWrapper from "../../../../../.storybook/decorators/CenterWrapper";
import Pill from "../../Pill";

storiesOf("Components", module)
  .add("Pill", () => (
    <CenterWrapper
      width="50%"
      height="50%"
    >
      <Pill
        name="Pill"
        onClick={action("Pill Clicked")}
        active={boolean("active", false)}
      >
        {text("Pill Text", "Vegan")}
      </Pill>
    </CenterWrapper>
  ));
