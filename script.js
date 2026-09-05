const menuButton = document.querySelector("#navToggle");
const navigation = document.querySelector("#siteNav");
const mobileViewport = window.matchMedia("(max-width: 760px)");

const setMenuOpen = (isOpen) => {
  navigation.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
};

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    setMenuOpen(false);
    menuButton.focus();
  }
});

mobileViewport.addEventListener("change", () => setMenuOpen(false));
