import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setCurrentPage } from "@/store/features/appGlobalSlice";
import { useDispatch } from "react-redux";
import AddWorkspaceModal from "./AddWorkspaceModal";
import { setWeek } from "date-fns";
import { setWorkspaceModal } from "@/store/features/workspaceSlice";

const WorkspaceSelection = ({
  workspaces,
  onCreateWorkspace,
  onSelectWorkspace,
}) => {
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const dispatch = useDispatch();

  const handleWorkspaceChange = (workspaceId) => {
    const selectedWorkspace = workspaces.find((ws) => ws.id === workspaceId);
    setCurrentWorkspace(selectedWorkspace);
    onSelectWorkspace(selectedWorkspace);
  };

  useEffect(() => {
    dispatch(setCurrentPage("Workspaces"));
  }, []);

  return (
    <div className="flex bg-white dark:bg-slate-700 p-4 flex-col">
      <h1 className="text-2xl font-semibold select-none">
        Workspaces help you manage projects, collaborate with teams, and keep
        everything organized.
      </h1>
      <div className="flex items-center justify-center mt-24 bg-white dark:bg-slate-700">
        <Card className="w-full max-w-md shadow-lg p-6 text-center">
          <CardContent>
            {true ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  No Workspaces Found
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Create a new workspace to get started.
                </p>
                  <Button
                    onClick={() => dispatch(setWorkspaceModal(true))}
                    className="bg-blue-600 dark:bg-slate-700"
                  >
                    Create Workspace
                  </Button>

                <AddWorkspaceModal />
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Select a Workspace
                </h2>
                <Select
                  onValueChange={handleWorkspaceChange}
                  value={currentWorkspace?.id || ""}
                >
                  <SelectTrigger className="w-full bg-white dark:bg-gray-800">
                    <SelectValue placeholder="Select Workspace">
                      {currentWorkspace?.name || "Select Workspace"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {workspaces?.map((workspace) => (
                      <SelectItem key={workspace.id} value={workspace.id}>
                        {workspace.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!currentWorkspace}
                >
                  Continue
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkspaceSelection;
