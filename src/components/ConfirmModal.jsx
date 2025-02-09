import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ConfirmModal = ({ onSelect, message }) => {
  return (
    <Dialog open={true} onOpenChange={()=>onSelect(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please Confirm!</DialogTitle>
        </DialogHeader>
        <div className="p-3">
          <h1 className="mb-6 font-semibold">{message}</h1>
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={() => onSelect(false)}>
            No
          </Button>
          <Button className="bg-blue-500" variant="default" onClick={() => onSelect(true)}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
