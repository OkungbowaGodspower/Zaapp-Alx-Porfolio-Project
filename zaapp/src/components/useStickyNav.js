import { useEffect } from "react";

const useStickyNav = () => {
  useEffect(() => {
    const sentinelEl = document.querySelector(".sentinel");
    const headerEl = document.querySelector(".header");

    if (sentinelEl && headerEl) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (!entry.isIntersecting) {
            // Add sticky class to trigger CSS animation
            document.body.classList.add("sticky");
          } else {
            // Remove sticky class when sentinel is in view
            document.body.classList.remove("sticky");
          }
        },
        {
          root: null, // Viewport as the root
          threshold: 0, // Trigger as soon as sentinel is out of view
        }
      );

      // Start observing the sentinel element
      observer.observe(sentinelEl);

      // Cleanup observer on component unmount
      return () => observer.disconnect();
    }
  }, []);
};

export default useStickyNav;
