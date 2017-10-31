// @flow
import React from "react";
import FilterSection from "./FilterSection";
import {
  EAT_DRINK_FILTERS,
  VENUE_FILTERS,
} from "../../state/data/defaultFilters";

const PrimaryFilter = () => {
  const eatDrinkFilters = (filters: Array<string>) => {
    // todo, add filters to api call
  };

  const venueFilters = (filters: Array<string>) => {
    // todo, add filters to api call
  };

  return (
    <div>
      <FilterSection title="EAT / DRINK" filters={EAT_DRINK_FILTERS} getFilters={eatDrinkFilters} />
      <FilterSection title="VENUE" filters={VENUE_FILTERS} getFilters={venueFilters} />
    </div>
  );
};

export default PrimaryFilter;
