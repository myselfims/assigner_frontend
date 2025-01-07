import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown } from "react-icons/bs";

const Dropdown = ({
  label,
  options,
  onSelect,
  allowMultiple = false,
  selectedColor = "bg-blue-200",
  className,
  showCount = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState("auto");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (value) => {
    if (allowMultiple) {
      setSelectedOptions((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    } else {
      setSelectedOptions([value]);
      setIsOpen(false); // Close the dropdown after single selection
    }
  };

  useEffect(() => {
    onSelect(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    if (dropdownRef.current) {
      const widths = Array.from(dropdownRef.current.children).map(
        (child) => child.offsetWidth
      );
      const maxWidth = Math.max(...widths);
      setDropdownWidth(`${maxWidth}px`);
    }
  }, [options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center text-nowrap space-x-1 px-4 py-2 border border-gray-300 rounded-md text-sm hover:shadow-md ${
          selectedOptions.length > 0 ? selectedColor : ""
        }`}
      >
        <span>{label}</span>
        {showCount && (
          <span className="border-blue-400 border w-4 h-4 text-xs flex items-center justify-center rounded-full p-1">
            {selectedOptions?.length}
          </span>
        )}
        <BsChevronDown />
      </button>

      {isOpen && (
        <div
          style={{ width: dropdownWidth }}
          className="absolute bg-white shadow-md rounded-md mt-2 z-10"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
            >
              {allowMultiple && (
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleOptionClick(option.value)}
                  className="mr-2"
                />
              )}
              <button
                onClick={() => !allowMultiple && handleOptionClick(option.value)}
                className="w-full text-nowrap text-left"
              >
                {option.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
