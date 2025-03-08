import React, { useState, useEffect } from "react";
import DayHoverCard from "./DayHoverCard";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDay } from "@/store/features/calendarSlice";

const DayCell = ({ day, toggleModal, eventDate, isToday }) => {
  const [actionItems, setActionItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch()
  const {monthEvents} = useSelector(state=>state.calendarState);
  const events = monthEvents[eventDate]?.events || [];
  const eventCount = monthEvents[eventDate]?.count || 0;


  return (
    <div
      onClick={()=>dispatch(setSelectedDay(eventDate))}
      className={`day-cell p-8 hover:bg-slate-200 text-center cursor-pointer relative border rounded-lg ${isToday && 'bg-blue-300'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>{day}</div>
      {eventCount > 0 && (
        <div className="absolute font-semibold bottom-2 left-0 right-0 text-xs text-blue-500 flex items-center justify-center">
          {eventCount} item(s)
        </div>
      )}

      {/* Show hover card */}
      {isHovered && eventCount > 0 && <DayHoverCard eventCount={eventCount} events={events} />}
    </div>
  );
};

export default DayCell;
