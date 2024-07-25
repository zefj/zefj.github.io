const primaryColorScheme = ""; // "light" | "dark"
// Define the colours upfront instead of using `getComputedStyles` because transition
// was getting in the way and I didn't want to delay the change.
const darkColor = "rgb(38, 38, 38)";
const lightColor = "rgb(251, 254, 251)";

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme");

function getPreferTheme() {
  // return theme value in local storage if it is set
  if (currentTheme) return currentTheme;

  // return primary color scheme if it is set
  if (primaryColorScheme) return primaryColorScheme;

  // return user device's prefer color scheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

let themeValue = getPreferTheme();

function setPreference() {
  localStorage.setItem("theme", themeValue);
  reflectPreference();
}

function reflectPreference() {
  document.firstElementChild.setAttribute("data-theme", themeValue);

  const toggle = document.querySelector("#theme-button");

  if (toggle) {
    toggle.dataset.darkMode = themeValue === "dark" ? "true" : "false";
    toggle.querySelector("input").checked =
      themeValue === "dark" ? true : false;
  }

  // Set the background color in <meta theme-color ... />
  document
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", themeValue === "dark" ? darkColor : lightColor);
}

// set early so no page flashes / CSS is made aware
reflectPreference();

window.onload = () => {
  function setThemeFeature() {
    // set on load so screen readers can get the latest value on the button
    reflectPreference();

    // now this script can find and listen for clicks on the control
    document
      .querySelector("#theme-button input")
      ?.addEventListener("change", () => {
        themeValue = themeValue === "light" ? "dark" : "light";
        setPreference();
      });
  }

  setThemeFeature();

  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", setThemeFeature);
};

// sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  });
