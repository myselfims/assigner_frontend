import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setCurrentWorkspace, setWorkspaceModal } from "@/store/features/workspaceSlice";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import Button from "../Button";
import AddWorkspaceModal from "@/pages/workspace_selection/AddWorkspaceModal";
import { Badge } from "../ui/badge";

const WorkspaceSelector = ({ workspaces, currentWorkspace }) => {
  const dispatch = useDispatch();

  const handleWorkspaceChange = (ws) => {
    dispatch(setCurrentWorkspace(ws));
  };

  return (
    <>
      <Select onValueChange={handleWorkspaceChange} value={currentWorkspace}>
        <h1 className="text-sm mb-1 font-semibold">Workspace</h1>
        <SelectTrigger className="w-full bg-white text-black">
          <SelectValue placeholder="Select Workspace">
            {currentWorkspace?.name ||
              "Select Workspace"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {workspaces.map((w) => (
            <SelectItem  key={w?.workspace?.id} value={w?.workspace}>
              <div className="flex justify-between">
                <h1>{w?.workspace?.name}</h1>
                {w?.isDefault &&
                <Badge className={'text-[10px] p-0 ml-2 px-2'}>Default</Badge>}
              </div>
            </SelectItem>
          ))}
          <Button onClick={()=>dispatch(setWorkspaceModal(true))} className="bg-blue-600 text-white mt-4 text-sm w-full py-[4px] font-light">
            {" "}
            <FaPlus className="mr-2" /> New Workspace
          </Button>
        </SelectContent>
      </Select>
      <AddWorkspaceModal />
    </>
  );
};

export default WorkspaceSelector;
