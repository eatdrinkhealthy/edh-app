import React from "react";
import Filter from "../components/Filter";
import { FilterList } from "../../api/filters";

const FilterContainer = () => (
  <Filter filterList={FilterList} />
);

export default FilterContainer;
