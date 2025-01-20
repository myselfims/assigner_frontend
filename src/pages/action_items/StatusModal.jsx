import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalBase from "../../components/ModalBase";
import { useDispatch, useSelector } from "react-redux";
import { setStatuses } from "../../store/features/actionItemsSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const StatusModal = ({ projectId, closeModal, onSave }) => {
  const {statuses} = useSelector(state => state.actionItems) 
  const [newStatus, setNewStatus] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    // Fetch existing statuses
    // axios.get(`/api/projects/${projectId}/statuses`).then((res) => {
    //   setStatuses(res.data.statuses);
    // });
    console.log(statuses)
  }, [projectId]);

  const handleAddStatus = () => {
    if (newStatus.trim()) {
      dispatch(setStatuses([...statuses, { name: newStatus, isDefault: false }]));
      setNewStatus("");
    }
  };

  const handleSave = () => {
    axios
      .post("/api/projects/manage-statuses", { projectId, statuses })
      .then(() => {
        onSave();
      });
  };

  return (
    <ModalBase>
      <div className="modal-content p-4">
        <h3 className="font-semibold mb-8">Manage Project Statuses</h3>
        <ul>
          {statuses.map((status, index) => (
            <li className="flex justify-between py-1" key={index}>
              <input
                type="text"
                value={status.label}
                onChange={(e) => {
                  const updated = [...statuses];
                  updated[index].name = e.target.value;
                  setStatuses(updated);
                }}
              />
              {!status.isDefault && (
                <div className="flex">
                  <FaEdit className="w-6 h-6 mr-4 cursor-pointer hover:text-blue-500"/>
                <MdDelete className="w-6 h-6 cursor-pointer hover:text-red-500" onClick={() => {
                  setStatuses(statuses.filter((_, i) => i !== index));
                }} />
                </div>
              )}
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="New Status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
          <button onClick={handleAddStatus}>Add</button>
        </div>
        <div className="mt-8">
          <button className="px-4 py-1 bg-blue-500 rounded-lg font-semibold text-white" onClick={handleSave}>Save</button>
          <button className="px-4 py-1" onClick={closeModal}>Close</button>

        </div>
      </div>

    </ModalBase>
  );
};

export default StatusModal;
