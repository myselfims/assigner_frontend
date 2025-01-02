import React, { useState, useEffect } from "react";
import DayHoverCard from "./DayHoverCard";

const DayCell = ({ day, toggleModal }) => {
  const [actionItems, setActionItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchActionItems = () => {
      if (day % 5 === 0) {
        return [
          { title: "Finish Task A", note: "Complete by 5 PM" },
          { title: "Team Meeting", note: "Zoom link in email" },
          { title: "Team Meeting", note: "Zoom link in email" },
          { title: "Team Meeting", note: "Zoom link in email" },
        ];
      } else if (day % 7 === 0) {
        return [{ title: "Submit Report", note: "Before EOD" }];
      }
      return [];
    };

    const items = fetchActionItems();
    setActionItems(items);
  }, [day]);

  return (
    <div
      className="day-cell p-8 hover:bg-slate-200 text-center cursor-pointer relative border rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => toggleModal(day, actionItems)}
    >
      <div>{day}</div>
      {actionItems.length > 0 && (
        <div className="absolute font-semibold bottom-2 left-0 right-0 text-xs text-blue-500 flex items-center justify-center">
          {actionItems.length} item(s)
        </div>
      )}

      {/* Show hover card */}
      {isHovered && actionItems.length > 0 && <DayHoverCard actionItems={actionItems} />}
    </div>
  );
};

export default DayCell;
