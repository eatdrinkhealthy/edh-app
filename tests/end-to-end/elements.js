export const baseUrl = "http://localhost:3000";

export const elements = {
  locationsMapComponent: "div.map-container",
  markerComponent: "div.markerContainer",
  navbar: {
    component: "div.nav #navbarFilterLink",
    filterLink: "#navbarFilterLink",
  },
  sidebarPage: {
    url: `${baseUrl}/sidebar`,
    component: "div.sidebar > div.pitch",
    homeLink: "a=Home",
  },
  createAccountForm: {
    usernameInput: "#username",
    emailInput: "#email",
    passwordInput: "#password",
    confirmPasswordInput: "#confirmPassword",
    submitButton: "input[value='Create Account']",
  },
  userMenu: {
    username: "#loggedInUser",
    joinLink: "#joinLink",
    logoutLink: "#logoutLink",
  },
  alertMessage: ".s-alert-box",  // NOTE: looked this class up in the component source code
  filterPage: {
    url: `${baseUrl}/filter`,
    component: "div.filter",
    closeLink: "div.close-filter",
    toggle: "span.react-toggle-label",
    toggleUnchecked: "div.react-toggle:not(.react-toggle--checked)",
  },
};
