// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf, action } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";
import CenterWrapper from "../../../../../.storybook/decorators/CenterWrapper";
import FilterSection from "../../FilterSection";
import Pill from "../../Pill";
import {
  EAT_DRINK_FILTERS,
} from "../../../../state/data/defaultFilters";


storiesOf("Components", module)
  .add("FilterSection", () => {
    window.SHOW_GRID = boolean("show grid", false);

    return (
      <FilterSection title={"EAT / DRINK"} filters={EAT_DRINK_FILTERS} getFilters={() => {}} />
    );
  })
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
