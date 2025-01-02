import React, { useState } from "react";

import { BsSearch } from 'react-icons/bs'
import { useDispatch } from "react-redux";

const SearchBar = ({handler}) => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()

  return (
    <div className="taskSearch flex items-center px-3 py-1 rounded-xl border-2 w-96 justify-between">
      <input
        onChange={(e)=>setQuery(e.target.value)}
        onKeyDown={(e)=>handler(query)}
        type="text"
        value={query}
        placeholder="Search tasks..."
        className="w-full outline-none"
      />
      <BsSearch className="w-5 cursor-pointer hover:opacity-70 h-5 " />
    </div>
  );
};

export default SearchBar;
