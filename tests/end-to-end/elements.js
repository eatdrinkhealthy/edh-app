export const baseUrl = "http://localhost:3000";

export const elements = {
  locationsMapComponent: "div.map-container",
  navbar: {
    component: "div.nav a[href='/sidebar']",
    joinLink: "#navbarJoinLink",
    filterLink: "#navbarFilterLink",
  },
  sidebarPage: {
    url: `${baseUrl}/sidebar`,
    component: "div.sidebar > div.pitch",
    homeLink: "a=Home",
  },
  markerComponent: "div.markerContainer",
  filterPage: {
    url: `${baseUrl}/filter`,
    component: "div.filter",
    closeLink: "div.close-filter",
    toggle: "span.react-toggle-label",
    toggleUnchecked: "div.react-toggle:not(.react-toggle--checked)",
  },
};
