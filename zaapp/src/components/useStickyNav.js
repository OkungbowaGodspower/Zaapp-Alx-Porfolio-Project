// src/components/useStickyNav.js

import { useEffect } from "react";

const useStickyNav = () => {
  useEffect(() => {
    const sectionHeroEl = document.querySelector(".section-hero");

    if (sectionHeroEl) {
      const obs = new IntersectionObserver(
        (entries) => {
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
    }
  }, []);
};

export default useStickyNav;
