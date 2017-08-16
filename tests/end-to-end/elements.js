const elements = {
  baseUrl: "http://localhost:3000",
  locationsMapComponent: "div.map-container",
  navbar: {
    component: "div.nav a[href='/sidebar']",
    joinLink: "#navbarJoinLink",
    filterLink: "#navbarFilterLink",
  },
  sidebar: {
    component: "div.sidebar > div.pitch",
    homeLink: "a=Home",
  },
  markerComponent: "div.markerContainer",
  filterListComponent: "div.filter",
  filterCloseLink: "div.close-filter",
  filterToggleComponent: "span.react-toggle-label",
  filterToggleUnchecked: "div.react-toggle:not(.react-toggle--checked)",
};

export default elements;
