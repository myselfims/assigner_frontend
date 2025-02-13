import { useSelector } from "react-redux";

export const useIsWorkspaceOwner = () => {
    const currentWorkspace = useSelector((state) => state.workspaceState.currentWorkspace);
    const user = useSelector((state) => state.globalState.user);

    return currentWorkspace?.owner?.id === user?.id;
};
