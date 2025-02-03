import React, { useState, useEffect } from "react";

const ToggleBtn = ({ value, handler }) => {
  const [toggle, setToggle] = useState(value);

  useEffect(() => {
    // Ensure the local state reflects the latest prop value
    setToggle(value);
  }, [value]);

  const toggler = (e) => {
    const newToggleState = e.target.checked;
    setToggle(newToggleState);
    handler(newToggleState); // Pass the new state directly to the handler
    console.log("handler called");
  };

  return (
    <div className="flex items-center justify-center">
      <label
        className="border-2 cursor-pointer flex relative h-7 w-10 rounded-full px-6"
      >
        <input
          onChange={toggler}
          type="checkbox"
          className="peer sr-only"
          checked={toggle}
        />
        <span className="rounded-full left-0 w-3 h-6 absolute top-0 peer-checked:bg-blue-300 peer-checked:left-6 transition-all bg-red-400 px-3"></span>
      </label>
    </div>
  );
};

export default ToggleBtn;
