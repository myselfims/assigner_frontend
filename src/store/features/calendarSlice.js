import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDay: null,
  monthEvents: {},
};

export const calendarSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setMonthEvents: (state, action) => {
      state.monthEvents = action.payload;
    },
    addEvent: (state, action) => {
      const newEvent = action.payload;
      const eventDate = newEvent.eventDate.split("T")[0]; // Extract YYYY-MM-DD

      if (!state.monthEvents[eventDate]) {
        state.monthEvents[eventDate] = { count: 0, events: [] };
      }

      state.monthEvents[eventDate].events.push(newEvent);
      state.monthEvents[eventDate].count += 1;
    },
    deleteEvent: (state, action) => {
      const { eventId, eventDate } = action.payload;
      const formattedDate = eventDate.split("T")[0]; // Extract YYYY-MM-DD

      if (state.monthEvents[formattedDate]) {
        state.monthEvents[formattedDate].events = state.monthEvents[
          formattedDate
        ].events.filter((event) => event.id !== eventId);
        state.monthEvents[formattedDate].count =
          state.monthEvents[formattedDate].events.length;

        if (state.monthEvents[formattedDate].count === 0) {
          delete state.monthEvents[formattedDate]; // Remove the date key if no events remain
        }
      }
    },
  },
});

export const { setSelectedDay, setMonthEvents, addEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
