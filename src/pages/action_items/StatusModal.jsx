import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalBase from "../../components/ModalBase";
import { useDispatch, useSelector } from "react-redux";
import { setStatuses } from "../../store/features/actionItemsSlice";
import StatusCard from "./StatusCard";
import { postData } from "../../api";
import { useParams } from "react-router-dom";

const StatusModal = ({ closeModal, onSave }) => {
  const { statuses } = useSelector((state) => state.actionItems);
  const [localStatuses, setLocalStatuses] = useState(statuses);
  const [newStatus, setNewStatus] = useState("");
  const dispatch = useDispatch();
  const {projectId} = useParams();

  const handleAddStatus = () => {
    if (newStatus.trim()) {
      setLocalStatuses([
        ...localStatuses,
        { id: null, name: newStatus, isDefault: false },
      ]);
      setNewStatus("");
    
    }
  };



  const handleSave = () => {
    console.log(localStatuses)
    postData(`/projects/statuses/${projectId}/`, { statuses: localStatuses })
      .then(() => {
        dispatch(setStatuses(localStatuses)); // Update Redux store
        closeModal(); // Close modal
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateStatus = (index, updatedStatus) => {
    const updated = [...localStatuses];
    updated[index] = updatedStatus;
    setLocalStatuses(updated);
  };

  const handleDeleteStatus = (index) => {
    setLocalStatuses(localStatuses.filter((_, i) => i !== index));
  };


  return (
    <ModalBase>
      <div className="modal-content p-4">
        <h3 className="font-semibold mb-8">Manage Project Statuses</h3>
        <ul>
          {localStatuses.map((status, index) => (
            <StatusCard
              key={index}
              status={status}
              index={index}
              onUpdate={handleUpdateStatus}
              onDelete={handleDeleteStatus}
            />
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            placeholder="New Status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            onClick={handleAddStatus}
            className="ml-2 px-4 py-1 bg-blue-500 rounded-lg font-semibold text-white"
          >
            Add
          </button>
        </div>
        <div className="mt-8">
          <button
            className="px-4 py-1 bg-blue-500 rounded-lg font-semibold text-white"
            onClick={handleSave}
          >
            Save
          </button>
          <button className="px-4 py-1" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </ModalBase>
  );
};

export default StatusModal;
