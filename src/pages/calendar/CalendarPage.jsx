import React, { useEffect, useState } from "react";
import AddReminderModal from "./AddReminderModal";
import Calendar from "./Calendar";
import ViewDayDetailsModal from "./ViewDayDetailsModal";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Tooltip from "../../components/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "@/store/features/appGlobalSlice";
import { fetchData } from "@/api";
import { useParams } from "react-router-dom";
import { setMonthEvents } from "@/store/features/calendarSlice";

const CalendarPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { selectedDay } = useSelector((state) => state.calendarState);
  const dispatch = useDispatch();
  const { projectId } = useParams();

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

  useEffect(() => {
    dispatch(setCurrentPage("Calendar"));
  }, []);

  useEffect(() => {
    const formattedDate = currentDate.toLocaleString("en-CA", { year: "numeric", month: "2-digit" });
    console.log(formattedDate); // Debugging

    fetchData(`/projects/${projectId}/calendar/${formattedDate}`)
      .then((res) => {
        const eventMap = res.reduce((acc, event) => {
          const date = event.eventDate.split("T")[0]; // Extract YYYY-MM-DD
          if (!acc[date]) {
            acc[date] = { count: 0, events: [] };
          }
          acc[date].count += 1;
          if (acc[date].events.length < 2) acc[date].events.push(event);
          return acc;
        }, {});

        console.log("eventMap", eventMap);
        dispatch(setMonthEvents(eventMap))
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [currentDate]);

  return (
    <div className="calendar-page container mx-auto md:p-4">
      <div className="flex items-center justify-between mb-6">
        <Tooltip content={"previous"} position={"bottom"}>
          <button
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-600"
            onClick={handlePreviousMonth}
          >
            <FaArrowLeft />
          </button>
        </Tooltip>
        <h1 className="text-2xl font-bold">{formatMonthYear(currentDate)}</h1>
        <Tooltip content="next" position="bottom">
          <button
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-600"
            onClick={handleNextMonth}
          >
            <FaArrowRight />
          </button>
        </Tooltip>
      </div>
      <Calendar date={currentDate} toggleModal={toggleModal} />
      {selectedDay && (
        // <ViewDayDetailsModal date={selectedDate} toggleModal={toggleModal} />
        <ViewDayDetailsModal date={selectedDay} />
      )}
    </div>
  );
};

export default CalendarPage;
