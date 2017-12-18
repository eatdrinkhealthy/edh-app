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
  .add("FilterSection", () => (
    <FilterSection
      id="eatDrinkFilters"
      title="EAT / DRINK"
      filters={EAT_DRINK_FILTERS}
      setFilter={action("filter clicked")}
    />
  ))
  .add("Pill", () => (
    <CenterWrapper
      width="50%"
      height="50%"
    >
      <Pill
        name="Pill"
        onClick={action("pill clicked")}
        active={boolean("Active", false)}
        selectedColor={text("Selected Color", "#5e2ca5")}
      >
        {text("Pill Text", "Vegan")}
      </Pill>
    </CenterWrapper>
  ));
