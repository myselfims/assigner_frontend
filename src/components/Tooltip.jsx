import React, { useState } from "react";
import PropTypes from "prop-types";

const Tooltip = ({ children, content, position = "top", className = "" }) => {
  const [visible, setVisible] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-10 bg-slate-700 text-white text-sm p-1 rounded shadow-lg whitespace-nowrap ${positions[position]} ${className}`}
        >
          {content}
          <div
            className={`absolute w-2 h-2 bg-slate-700 rotate-45 ${
              position === "top"
                ? "bottom-[-4px] left-1/2 transform -translate-x-1/2"
                : position === "bottom"
                ? "top-[-4px] left-1/2 transform -translate-x-1/2"
                : position === "left"
                ? "right-[-4px] top-1/2 transform -translate-y-1/2"
                : "left-[-4px] top-1/2 transform -translate-y-1/2"
            }`}
          ></div>
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string.isRequired,
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  className: PropTypes.string,
};

export default Tooltip;
