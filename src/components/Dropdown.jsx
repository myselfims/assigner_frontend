import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown } from "react-icons/bs";

const Dropdown = ({
  name,
  options,
  onSelect,
  allowMultiple = false,
  selectedColor = "bg-blue-200",
  className,
  showCount = true,
  children,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef();
  const hasMounted = useRef(false);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleOptionClick = (value) => {
    if (disabled) return;

    if (allowMultiple) {
      setSelectedOptions((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else {
      setSelectedOptions([value]);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (hasMounted.current) {
      onSelect(selectedOptions);
    } else {
      hasMounted.current = true;
    }
  }, [selectedOptions]);

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
    <div className={`relative inline-block`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center text-nowrap space-x-1 py-2 px-4 ${className} border border-gray-300 rounded-md text-sm hover:shadow-md ${
          selectedOptions.length > 0 ? selectedColor : ""
        } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={disabled}
      >
        <span>{name}</span>
        {showCount && (
          <span className="border-blue-400 border w-4 h-4 text-xs flex items-center justify-center rounded-full p-1">
            {selectedOptions?.length}
          </span>
        )}
        <BsChevronDown />
      </button>

      {isOpen && !disabled && (
        <div className="absolute bg-white shadow-md rounded-md z-50 w-max top-full left-0">
          {options?.map((option, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
            >
              {allowMultiple && (
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleOptionClick(option.value)}
                  className="mr-2"
                  disabled={disabled}
                />
              )}
              <button
                disabled={disabled || name === option?.name}
                onClick={() => !allowMultiple && handleOptionClick(option?.value)}
                className={`w-full text-nowrap text-left font-semibold ${
                  name === option?.name && "text-blue-600 opacity-80"
                } ${disabled ? "cursor-not-allowed" : ""}`}
              >
                {option?.name}
                <p className="text-xs font-normal text-black">
                  {option?.description}
                </p>
              </button>
            </div>
          ))}

          <div className="">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
