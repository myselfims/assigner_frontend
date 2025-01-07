import React, { useState } from "react";
import AddReminderModal from "./AddReminderModal";
import Calendar from "./Calendar";
import ViewDayDetailsModal from "./ViewDayDetailsModal";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const CalendarPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [actionItems, setActionItems] = useState([]);

  const toggleModal = (date, items = []) => {
    setSelectedDate(date);
    setActionItems(items);
    setShowModal(!showModal);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  return (
    <div className="calendar-page container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handlePreviousMonth}
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">
          {formatMonthYear(currentDate)}
        </h1>
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleNextMonth}
        >
          <FaArrowRight />
        </button>
      </div>
      <Calendar date={currentDate} toggleModal={toggleModal} />
      {showModal && (
        // <ViewDayDetailsModal date={selectedDate} toggleModal={toggleModal} />
        <ViewDayDetailsModal
        date={selectedDate}
        items={actionItems}
        toggleModal={toggleModal}
      />
      )}
    </div>
  );
};

export default CalendarPage;
