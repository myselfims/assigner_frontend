import React from "react";

const DayHoverCard = ({ events, eventCount }) => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-white shadow-lg border p-2 rounded-lg text-sm 
      overflow-hidden z-10 hover:z-20 hover:overflow-auto scrollbar-none"
    >
      {events.slice(0, 2).map((item, index) => (
        <div key={index} className="mb-2 border-b">
          <span className="text-xs truncate">{item.title}</span>
          {item.note && <div className="text-xs text-gray-500">{item.note}</div>}
        </div>
      ))}
      {eventCount > 2 && (
        <div className="text-blue-500 text-xs mt-2 cursor-pointer">
          +{eventCount - 2 } more
        </div>
      )}
    </div>
  );
};

export default DayHoverCard;
