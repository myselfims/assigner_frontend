import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatuses } from "../../store/features/actionItemsSlice";
import { postData } from "../../api";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StatusCard from "./StatusCard";

const StatusModal = ({ closeModal }) => {
  const { statuses } = useSelector((state) => state.actionItems);
  const [localStatuses, setLocalStatuses] = useState(statuses);
  const [newStatus, setNewStatus] = useState("");
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const handleAddStatus = () => {
    if (newStatus.trim()) {
      postData(`/projects/statuses/${projectId}/`, { name: newStatus }).then((res) => {
        setLocalStatuses([...localStatuses, res]);
        dispatch(setStatuses([...localStatuses, res]));
        setNewStatus("");
      });
    }
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
    <Dialog open onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Project Statuses</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {localStatuses.map((status, index) => (
            <Card key={index} className="p-4">
              <StatusCard
                status={status}
                index={index}
                onUpdate={handleUpdateStatus}
                onDelete={handleDeleteStatus}
              />
            </Card>
          ))}
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="New Status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />
            <Button onClick={handleAddStatus}>Add</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusModal;
