import React from "react";
import DayCell from "./DayCell";

const Calendar = ({ date, toggleModal }) => {
  const getDaysInMonth = (currentDate) => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(date);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="calendar grid grid-cols-7 gap-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="text-center font-semibold">{day}</div>
      ))}
      {Array.from({ length: firstDayOfMonth }).map((_, index) => (
        <div key={index} className="text-center"></div>
      ))}
      {daysArray.map((day) => (
        <DayCell key={day} day={day} toggleModal={toggleModal} />
      ))}
    </div>
  );
};

export default Calendar;
