///////////////////////////////////////////////////////////
// Mobile navigation functionality

document.addEventListener("DOMContentLoaded", function () {
  const btnNavEl = document.querySelector(".btn-mobile-nav");
  const headerEl = document.querySelector(".header");

  if (btnNavEl) {
    // Check if the mobile nav button exists
    btnNavEl.addEventListener("click", function () {
      if (headerEl) {
        // Check if the header exists, and toggle the 'nav-open' class
        headerEl.classList.toggle("nav-open");
      }
    });
  }
});

///////////////////////////////////////////////////////////
// Smooth scrolling for anchor links

document.addEventListener("DOMContentLoaded", function () {
  const allLinks = document.querySelectorAll("a:link");
  const headerEl = document.querySelector(".header");

  allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = link.getAttribute("href");

      // Scroll back to top
      if (href === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      // Scroll to sections with IDs
      if (href !== "#" && href.startsWith("#")) {
        const sectionEl = document.querySelector(href);
        sectionEl?.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile navigation after click
      if (link.classList.contains("main-nav-link") && headerEl) {
        headerEl.classList.toggle("nav-open");
      }
    });
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation based on scroll position

document.addEventListener("DOMContentLoaded", function () {
  const sectionHeroEl = document.querySelector(".section-hero");

  if (sectionHeroEl) {
    const obs = new IntersectionObserver(
      function (entries) {
        const ent = entries[0];

        if (!ent.isIntersecting) {
          document.body.classList.add("sticky");
        } else {
          document.body.classList.remove("sticky");
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-80px",
      }
    );
    obs.observe(sectionHeroEl);
  } else {
    // console.warn("Element with class 'section-hero' not found.");
  }
});

///////////////////////////////////////////////////////////
// Safari flexbox gap property fix

document.addEventListener("DOMContentLoaded", function () {
  function checkFlexGap() {
    const flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    document.body.appendChild(flex);
    const isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);

    if (!isSupported) {
      document.body.classList.add("no-flexbox-gap");
    }
  }
  checkFlexGap();
});
