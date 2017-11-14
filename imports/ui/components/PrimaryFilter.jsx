// @flow
import React from "react";
import FilterSection from "./FilterSection";
import type { IEatDrinkFilter } from "../../state/reducers/eatDrinkFiltersReducers";
import type { IVenueTypeFilter } from "../../state/reducers/venueTypeFiltersReducers";

type IPrimaryFilterProps = {
  eatDrinkFilters: Array<IEatDrinkFilter>,
  toggleEatDrinkFilterHandler: (id: string) => void,
  venueTypeFilters: Array<IVenueTypeFilter>,
  toggleVenueTypeFilterHandler: (id: string) => void,
};

const PrimaryFilter = ({
  eatDrinkFilters,
  toggleEatDrinkFilterHandler,
  venueTypeFilters,
  toggleVenueTypeFilterHandler,
}: IPrimaryFilterProps) => (
  <div>
    <FilterSection
      title="EAT / DRINK"
      filters={eatDrinkFilters}
      setFilter={toggleEatDrinkFilterHandler}
    />
    <FilterSection
      title="VENUES"
      filters={venueTypeFilters}
      setFilter={toggleVenueTypeFilterHandler}
    />
  </div>
);

export default PrimaryFilter;
