// @flow
import React from "react";
import FilterSection from "./FilterSection";
import {
  EAT_DRINK_FILTERS,
  VENUE_FILTERS,
} from "../../state/data/defaultFilters";

const PrimaryFilter = () => {
  const eatDrinkFilters = (filters: Array<string>) => {
    console.log("eat drink filters:", filters);
  };

  const venueFilters = (filters: Array<string>) => {
    console.log("venue filters:", filters);
  };

  return (
    <div>
      <FilterSection title="EAT / DRINK" filters={EAT_DRINK_FILTERS} getFilters={eatDrinkFilters} />
      <FilterSection title="VENUE" filters={VENUE_FILTERS} getFilters={venueFilters} />
    </div>
  );
};

export default PrimaryFilter;
