import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import debounce from "lodash/debounce";

const SearchBar = ({ handler }) => {
  const [query, setQuery] = useState("");

  // Debounced handler to avoid excessive updates
  const debouncedHandler = debounce((value) => {
    handler(value);
  }, 300);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedHandler(value);
  };

  return (
    <div className="taskSearch flex items-center px-3 py-1 rounded-xl border-2 w-96 justify-between">
      <input
        onChange={handleChange}
        type="text"
        value={query}
        placeholder="Search tasks..."
        className="w-full outline-none"
      />
      <BsSearch className="w-5 cursor-pointer hover:opacity-70 h-5" />
    </div>
  );
};

export default SearchBar;
