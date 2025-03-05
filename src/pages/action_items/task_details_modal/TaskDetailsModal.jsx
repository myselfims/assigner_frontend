import React, { useEffect, useState } from "react";
import {
  deleteData,
  fetchData,
  getAuthInfo,
  updateData,
} from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, setTasks } from "../../../store/features/actionItemsSlice";
import ConfirmModal from "../../../components/ConfirmModal";
import Comments from "../../../components/Comments";
import { setComments, setModal } from "../../../store/features/taskDetailsSlice";
import { useFormik } from "formik";
import { TaskSchema } from "../../../validation/validation_schema";
import { setAlert } from "../../../store/features/appGlobalSlice";

// Shadcn UI components
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {Separator} from '@/components/ui/separator'
import { useIsWorkspaceOwner } from "@/customHooks";
import DetailsTab from "./detailsTab";

const TaskDetailsModal = () => {
  const task = useSelector((state) => state.taskDetails.activeTask);
  const {selectedSprint} = useSelector(state=>state.actionItems)
  const { comments } = useSelector((state) => state.taskDetails);
  const [confModal, setConfModal] = useState(false);
  const dispatch = useDispatch();
  const isOwner = useIsWorkspaceOwner()

  // AI Assistant state
  const [query, setQuery] = useState("");
  const [aiResponses, setAiResponses] = useState([]);
  const sendQuery = () => {
    // For now, simulate an AI response.
    setAiResponses([...aiResponses, { query, answer: "This is a sample AI response." }]);
    setQuery("");
  };

  const deleteTask = (confirmation) => {
    if (confirmation) {
      deleteData(`/tasks/${task.id}`).then((res) => {
        dispatch(setModal(false));
        dispatch(removeTask(task.id));
      });
    }
    setConfModal(false);
  };

  return (
    <Dialog open onOpenChange={(open) => dispatch(setModal(open))}>
      <DialogContent className="max-w-3xl h-5/6 flex flex-col items-between overflow-y-auto">
        <DialogHeader className="flex justify-between select-none">
          <DialogTitle>{selectedSprint?.title}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4 select-none">
          <TabsList>
            <TabsTrigger value="details" onClick={() => setCurrentForm("details")}>
              Details
            </TabsTrigger>
            <TabsTrigger value="comments" onClick={() => setCurrentForm("comments")}>
              Comments{" "}
              <span className="ml-2 bg-green-200 rounded-full text-xs px-2">
                {comments.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="assistant" onClick={() => setCurrentForm("assistant")}>
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <DetailsTab />

          <TabsContent value="comments" className="mt-4">
            {/* <Comments /> */}
          </TabsContent>

          <TabsContent value="assistant" className="mt-4">
            <div className="flex flex-col h-96 justify-between">
              <p className="text-sm text-gray-600">Chat with our AI assistant about this task.</p>
              <div className="space-y-2">
                {aiResponses.map((res, idx) => (
                  <div key={idx} className="p-2 border rounded-md">
                    <p className="font-medium">You: {res.query}</p>
                    <p className="text-sm text-gray-700">AI: {res.answer}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a question..."
                />
                <Button onClick={sendQuery}>Send</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter />
      </DialogContent>

      {confModal && (
        <ConfirmModal
          message="Do you really want to delete this task?"
          onSelect={deleteTask}
        />
      )}
    </Dialog>
  );
};

export default TaskDetailsModal;
