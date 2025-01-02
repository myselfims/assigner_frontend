import React from "react";

const DayHoverCard = ({ actionItems }) => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-white shadow-lg border p-2 rounded-lg text-sm 
      overflow-hidden z-10 hover:z-20 hover:overflow-auto scrollbar-none"
    >
      {actionItems.slice(0, 2).map((item, index) => (
        <div key={index} className="mb-2">
          <span className="font-bold">{item.title}</span>
          {item.note && <div className="text-xs text-gray-500">{item.note}</div>}
        </div>
      ))}
      {actionItems.length > 2 && (
        <div className="text-blue-500 text-xs mt-2 cursor-pointer">
          +{actionItems.length - 2} more
        </div>
      )}
    </div>
  );
};

export default DayHoverCard;
