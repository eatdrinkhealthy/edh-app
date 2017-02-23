// @flow
import React from "react";
import Filter from "../components/Filter";
import FILTER_LIST from "../../api/filters";

const FilterContainer = () => (
  <Filter filterList={FILTER_LIST} />
);

export default FilterContainer;
