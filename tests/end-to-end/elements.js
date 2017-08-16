const elements = {
  baseUrl: "http://localhost:3000",
  locationsMapComponent: "div.map-container",
  navbar: {
    component: "div.nav a[href='/sidebar']",
    joinLink: "#navbarJoinLink",
    filterLink: "#navbarFilterLink",
  },
  sidebarComponent: "div.sidebar > div.pitch",
  markerComponent: "div.markerContainer",
  homeLinkComponent: "a=Home",
  filterListComponent: "div.filter",
  filterCloseLink: "div.close-filter",
  filterToggleComponent: "span.react-toggle-label",
  filterToggleUnchecked: "div.react-toggle:not(.react-toggle--checked)",
};

export default elements;
