// @flow
import React from "react";
import FilterSection from "./FilterSection";
import type { IEatDrinkFilter } from "../../state/reducers/eatDrinkFiltersReducers";

type IPrimaryFilterProps = {
  eatDrinkFilters: Array<IEatDrinkFilter>,
  toggleEatDrinkFilterHandler: (id: string) => void,
};

const PrimaryFilter = (
  { eatDrinkFilters, toggleEatDrinkFilterHandler }: IPrimaryFilterProps,
) => (
  <div>
    <FilterSection
      title="EAT / DRINK"
      filters={eatDrinkFilters}
      setFilter={toggleEatDrinkFilterHandler}
    />
  </div>
);

export default PrimaryFilter;
