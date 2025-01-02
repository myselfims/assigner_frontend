import React from 'react';

const InputField = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  type = "text", // Default to "text"
  className = "",
}) => {
  return (
    <input
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
      className={`border ${
        error && touched ? "border-red-500" : "border-gray-300"
      } rounded-md outline-none p-2 ${className}`}
      type={type}
    />
  );
};

export default InputField;
