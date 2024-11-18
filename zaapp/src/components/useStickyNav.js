import { useEffect } from "react";

const useStickyNav = () => {
  useEffect(() => {
    // Select the sentinel element just above the header
    const sentinelEl = document.querySelector(".sentinel");

    if (sentinelEl) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          // Add 'sticky' class to body when sentinel is out of view
          if (!entry.isIntersecting) {
            document.body.classList.add("sticky");
          } else {
            document.body.classList.remove("sticky");
          }
        },
        {
          root: null, // The viewport
          threshold: 0, // Trigger as soon as the sentinel is out of view
        }
      );

      // Observe the sentinel element
      observer.observe(sentinelEl);

      // Clean up observer on component unmount
      return () => observer.disconnect();
    }
  }, []);
};

export default useStickyNav;
