import React from "react";

const MonthDivider = ({ file, children }) => {
  const monthYear = new Date(file.date).toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="month-divider mb-6">
      <div className="month-label text-lg font-semibold text-gray-700">{monthYear}</div>
      <div className="files-list">{children}</div>
    </div>
  );
};

export default MonthDivider;
