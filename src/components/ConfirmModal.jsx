import React from "react";
import ModalBase from "./ModalBase";

const ConfirmModal = ({ onSelect, message }) => {
  return (
    <ModalBase>
      <div className="head px-3 py-1 bg-slate-100 border-b text-xl ">
        <h1>Please Confirm!</h1>
      </div>
      <div className="body p-3">
        <h1 className="mb-6 font-semibold">{message}</h1>
        <div className="btn flex my-2">
          <button
            onClick={() => onSelect(true)}
            className="bg-blue-600 mx-1 rounded w-full p-2 font-semibold text-white"
          >
            Yes
          </button>
          <button
            onClick={() => onSelect(false)}
            className="bg-red-500 mx-1 rounded w-full p-2 font-semibold text-white"
          >
            No
          </button>
        </div>
      </div>
    </ModalBase>
  );
};

export default ConfirmModal;
