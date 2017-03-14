// @flow
import React from "react";
import Filter from "../components/Filter";
import FILTER_LIST from "../../data/state/data/defaultFilters";

const FilterContainer = () => (
  <Filter filterList={FILTER_LIST} />
);

export default FilterContainer;
