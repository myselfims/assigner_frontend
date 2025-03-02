import { useSelector } from "react-redux";

export const useIsWorkspaceOwner = () => {
    const currentWorkspace = useSelector((state) => state.workspaceState.currentWorkspace);
    const role = useSelector((state) => state.globalState.role);
    console.log(role)
    return  role?.name === 'owner';
};
