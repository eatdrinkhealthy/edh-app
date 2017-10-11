// @flow
import React from "react";
import Button from "react-bootstrap/lib/Button";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MapContainer from "../containers/MapContainer";

const HomePage = () => (
  <div>
    <Navbar />
    <MapContainer />
    <div>
      <Link
        id="filterLink"
        className="btn btn-default"
        to="/filter"
        role="button"
      >
        Filter
      </Link>
      <Button href="/filter" >Filter (button component)</Button>
    </div>
  </div>
);

export default HomePage;
