import React, { useState } from "react";

import { BsSearch } from 'react-icons/bs'
import { useDispatch } from "react-redux";

const SearchBar = ({handler}) => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()

  return (
    <div className="taskSearch flex items-center">
      <input
        onChange={(e)=>setQuery(e.target.value)}
        onKeyDown={(e)=>handler(e.target.value)}
        type="text"
        placeholder="Search tasks..."
        className="px-3 py-1 rounded-full border-2 outline-blue-200 w-72"
      />
      <BsSearch className="w-5 mx-4 cursor-pointer hover:opacity-70 h-5 " />
    </div>
  );
};

export default SearchBar;
