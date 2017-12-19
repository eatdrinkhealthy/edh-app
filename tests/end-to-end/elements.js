// selectors for various elements, organized by pages, page sections, or components

export const baseUrl = "http://localhost:3000";

export const elements = {
  mapComponent: "div.map-holder",
  markerComponent: "div.markerContainer",
  homePage: {
    navbar: "#navbar",
    eatDrinkFilters: "#eatDrinkFilters",
    venueTypeFilters: "#venueTypeFilters",
  },
  navbar: {
    username: ".nav__username",
    username_row2: ".nav__username_row2",
  },
  header: {
    homeLink: "#homeLink",
  },
  sidebarPage: {
    url: `${baseUrl}/sidebar`,
    component: "#sidebarPage",
  },
  createAccountForm: {
    username: "#username",
    usernameError: "#usernameError",
    email: "#email",
    emailError: "#emailError",
    password: "#password",
    passwordError: "#passwordError",
    confirmPassword: "#confirmPassword",
    confirmPasswordError: "#confirmPasswordError",
    submitButton: "#createAccountSubmit",
  },
  loginForm: {
    usernameEmail: "#usernameEmail",
    usernameEmailError: "#usernameEmailError",
    password: "#loginPassword",
    passwordError: "#loginPasswordError",
    submitButton: "#loginSubmit",
  },
  userMenu: {
    joinLink: "#joinLink",
    loginLink: "#loginLink",
    logoutLink: "#logoutLink",
  },
  alertMessage: ".s-alert-box", // NOTE: looked this class up in the component source code
};
