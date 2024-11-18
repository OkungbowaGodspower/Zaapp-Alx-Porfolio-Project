// src/components/useFlexboxGapFix.js

import { useEffect } from "react";

const useFlexboxGapFix = () => {
  useEffect(() => {
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
  }, []);
};

export default useFlexboxGapFix;
