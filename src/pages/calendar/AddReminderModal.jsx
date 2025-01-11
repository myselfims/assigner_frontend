import React, { useState } from "react";

const AddReminderModal = ({ date, toggleModal }) => {
  const [reminder, setReminder] = useState("");

  const handleSaveReminder = () => {
    // Logic to save reminder for the selected date
    console.log(`Reminder for ${date}: ${reminder}`);
    toggleModal(null); // Close modal after saving
  };

  return (
    <div className="modal z-40 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-content bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Add Reminder for {date}</h2>
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows="4"
          placeholder="Enter your reminder or comment here"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />
        <button
          onClick={handleSaveReminder}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Save Reminder
        </button>
        <button
          onClick={() => toggleModal(null)}
          className="ml-4 bg-gray-500 text-white py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddReminderModal;
