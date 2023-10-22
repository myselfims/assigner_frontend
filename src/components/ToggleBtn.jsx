import React, { useState } from "react";

const ToggleBtn = ({value,handler}) => {
    const [toggle, setToggle] = useState(value)

    const toggler = (e)=>{
        setToggle(e.target.checked)
        handler(toggle)
    }
  

  return (
    <div className="flex items-center justify-center">
      <label
        htmlFor="check"
        className='border-2 cursor-pointer flex  relative h-7 w-10 rounded-full px-6'
      >
        <input onChange={toggler} id="check" type="checkbox" className="peer sr-only" checked={toggle}/>
        <span className="rounded-full left-0 w-3 h-6 absolute top-0 peer-checked:bg-blue-300 peer-checked:left-6 transition-all bg-red-400 px-3"></span>
      </label>
    </div>
  );
};

export default ToggleBtn;
