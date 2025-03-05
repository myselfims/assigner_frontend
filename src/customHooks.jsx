import { useSelector } from "react-redux";

export const useIsWorkspaceOwner = () => {
    const role = useSelector((state) => state.globalState.role);
    return  role?.name === 'owner';
};
