import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { setCurrentWorkspace } from "@/store/features/workspaceSlice";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import Button from "../Button";

const WorkspaceSelector = ({ workspaces, currentWorkspace }) => {
  const dispatch = useDispatch()

  const handleWorkspaceChange = (ws) => {
    console.log(ws)
    dispatch(setCurrentWorkspace(ws));
  };

  return (
    <Select onValueChange={handleWorkspaceChange} value={currentWorkspace}>
      <h1 className="text-sm mb-1 font-semibold">Workspace</h1>
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
        <Button className="bg-sky-200 mt-4 text-sm w-full py-[4px] font-light"> <FaPlus className="mr-2" /> New Workspace</Button>
      </SelectContent>
    </Select>
  );
};

export default WorkspaceSelector;
