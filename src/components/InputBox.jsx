import React from "react";

const InputBox = ({name, value, handler, handleError, label, placeholder, className}) => {

  return (
    <div className="w-full">
      <p>{label}</p>
      <input
        value={value}
        name={name}
        placeholder={placeholder}
        type="text"
        className={`rounded-xl bg-[#F5F5F5] w-full mt-2 h-[43.91px] p-3 outline-none ${
          handleError?.errors[name.toLowerCase()] && handleError.touched[name.toLowerCase()] ? "border-red-300 border-2" : null
        } ${className}`}
        onChange={handler?.handleChange}
        onBlur={handler?.handleBlur}
      />
      <p className="text-red-400 mb-[21px]">
        {handleError?.errors[name.toLowerCase()] && handleError.touched[name.toLowerCase()] ? handleError.errors[name.toLowerCase()] : null}
      </p>
    </div>
  );
};

export default InputBox;
