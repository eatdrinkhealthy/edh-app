export const baseUrl = "http://localhost:3000";

export const elements = {
  mapComponent: "div.map-holder",
  markerComponent: "div.markerContainer",
  homePage: {
    navbar: "#navbar",
    filterLink: "#filterLink",
  },
  navbar: {
    username: "#loggedInUser",
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
  loginForm: {
    usernameEmailInput: "#usernameEmail",
    passwordInput: "#loginPassword",
    submitButton: "input[value='Login']",
  },
  userMenu: {
    joinLink: "#joinLink",
    loginLink: "#loginLink",
    logoutLink: "#logoutLink",
  },
  alertMessage: ".s-alert-box", // NOTE: looked this class up in the component source code
  filterPage: {
    url: `${baseUrl}/filter`,
    component: "div.filter",
    closeLink: "div.close-filter",
    toggle: "span.react-toggle-label",
    toggleUnchecked: "div.react-toggle:not(.react-toggle--checked)",
  },
};
