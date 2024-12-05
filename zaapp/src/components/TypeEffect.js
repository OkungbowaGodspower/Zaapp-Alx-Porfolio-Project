import React, { useState, useEffect } from "react";

const TypingEffect = ({ text = "" }) => {
  const [displayedText, setDisplayedText] = useState(""); // Start with an empty string

  useEffect(() => {
    let i = 0;
    setDisplayedText(""); // Reset displayedText on text change

    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i + 1)); // Use slice to include all up to current index
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [text]);

  return <span>{displayedText}</span>;
};

export default TypingEffect;
