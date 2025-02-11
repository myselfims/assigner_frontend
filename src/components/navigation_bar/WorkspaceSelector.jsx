import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { setCurrentWorkspace } from "@/store/features/workspaceSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const WorkspaceSelector = ({ workspaces, currentWorkspace }) => {
  const dispatch = useDispatch()

  const handleWorkspaceChange = (ws) => {
    console.log(ws)
    dispatch(setCurrentWorkspace(ws));
  };

  return (
    <Select onValueChange={handleWorkspaceChange} value={currentWorkspace}>
      <SelectTrigger className="w-full bg-white text-black">
        <SelectValue placeholder="Select Workspace">
          {workspaces.find((ws) => ws.id === currentWorkspace?.id)?.name || "Select Workspace"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {workspaces.map((workspace) => (
          <SelectItem key={workspace.id} value={workspace}>
            {workspace.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default WorkspaceSelector;
