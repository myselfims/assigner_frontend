import React from "react";

const ThemeLayout = ({ id, label, sidebar, content, checked, onChange }) => (
  <div className="flex items-center flex-col">
    <div className="border border-black w-72 h-40 rounded-lg flex overflow-hidden">
      <div className={`w-4/12 h-full ${sidebar} p-2`}>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-full h-4 bg-slate-200 my-2 rounded-sm"
          ></div>
        ))}
      </div>
      <div className={`w-full h-full p-2 ${content}`}>
        <div className="w-full h-12 flex">
          <div className="w-full h-full bg-slate-200 mr-1 rounded-sm"></div>
          <div className="w-full h-full bg-slate-200 ml-1 rounded-sm"></div>
        </div>
        <div className="w-full bg-slate-200 h-full rounded-sm my-2"></div>
      </div>
    </div>
    <input
      className="my-2 w-4 h-4"
      type="radio"
      checked={checked}
      onChange={() => onChange(id)}
    />
    <label>{label}</label>
  </div>
);

export default ThemeLayout;
