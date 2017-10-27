// @flow
import React from "react";
import FilterSection from "./FilterSection";
import { EAT_DRINK_FILTERS } from "../../state/data/defaultFilters";

const PrimaryFilter = () => (
  <div>
    <FilterSection title="Eat / Drink" filters={EAT_DRINK_FILTERS} />
  </div>
);

export default PrimaryFilter;
