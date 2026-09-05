(function () {
  var header = document.getElementById("siteHeader");
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  var backdrop = document.getElementById("navBackdrop");
  var navLinks = nav ? nav.querySelectorAll("[data-nav-link]") : [];

  function openNav() {
    nav.classList.add("is-open");
    backdrop.hidden = false;
    // next frame, so the transition actually runs
    requestAnimationFrame(function () {
      backdrop.classList.add("is-visible");
    });
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("no-scroll");
    if (navLinks[0]) navLinks[0].focus();
  }

  function closeNav() {
    nav.classList.remove("is-open");
    backdrop.classList.remove("is-visible");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("no-scroll");
    setTimeout(function () {
      backdrop.hidden = true;
    }, 220);
    toggle.focus();
  }

  function isNavOpen() {
    return nav.classList.contains("is-open");
  }

  if (toggle && nav && backdrop) {
    toggle.addEventListener("click", function () {
      isNavOpen() ? closeNav() : openNav();
    });

    backdrop.addEventListener("click", closeNav);

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (isNavOpen()) closeNav();
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isNavOpen()) closeNav();
    });

    // Collapse the mobile panel automatically if the viewport grows past
    // the breakpoint while it's open.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760 && isNavOpen()) closeNav();
    });
  }

  // Header elevation once the page has scrolled a little.
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 4);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Highlight the nav link for the section currently in view.
  var sections = ["about", "work", "experience", "contact"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            var isCurrent = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("is-active", isCurrent);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();