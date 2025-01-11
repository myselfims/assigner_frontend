import React from "react";

const ViewDayDetailsModal = ({ date, items, toggleModal }) => {
  return (
    <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Details for {date}</h2>
        <div>
          {items.map((item, index) => (
            <div key={index} className="mb-4 flex justify-between items-center">
              <div className="">
                <h3 className="font-semibold">{item.title}</h3>
                {item.note && (
                  <p className="text-sm text-gray-600">{item.note}</p>
                )}
              </div>
              <button className="bg-red-500 text-white px-2 rounded-md">Remove</button>
            </div>
          ))}
        </div>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={toggleModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewDayDetailsModal;
