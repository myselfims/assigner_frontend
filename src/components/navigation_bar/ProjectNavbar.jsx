import React, { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../../store/features/appGlobalSlice";
import { setMembers, setProject, setRole } from "../../store/features/actionItemsSlice";
import { fetchData } from "../../api";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack, IoIosCalendar } from "react-icons/io";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaTasks, FaUsersCog } from "react-icons/fa";
import { LuMessageSquare, LuSettings, LuClipboard } from "react-icons/lu";
import { PiKanbanDuotone } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RxActivityLog } from "react-icons/rx";
import { hasPermission } from "@/access/role_permissions"; // Your RBAC utility
import { useIsWorkspaceOwner } from "@/customHooks";

const ProjectNavBar = () => {
  const { projectId } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  // Assuming that the user's role within the project is stored here.
  const { project, role } = useSelector((state) => state.actionItems);
  const { currentWorkspace } = useSelector((state) => state.workspaceState);
  const isOwner = useIsWorkspaceOwner();
  console.log('workspace is ', isOwner)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        let res = await fetchData(`/projects/${projectId}`);
        let members = await fetchData(`/projects/team/${projectId}`);
        let roleRes = await fetchData(`/projects/${projectId}/member/role/`);
        console.log(roleRes?.role)
        dispatch(setMembers(members));
        dispatch(setRole(roleRes?.role));
        dispatch(setProject(res));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, [projectId]);

  const isActive = (path) => pathname.includes(path);

  // Define nav items with required permissions.
  const navItems = [
    { to: "/projects/overview", icon: <AiOutlineDashboard />, label: "Overview", permission: "view:overview" },
    { to: `/${currentWorkspace?.id}/project/${projectId}/action-items`, icon: <FaTasks />, label: "Action Items", permission: "view:actionItems" },
    { to: `/${currentWorkspace?.id}/project/${projectId}/board`, icon: <PiKanbanDuotone />, label: "Board", permission: "view:projects" },
    { to: `/${currentWorkspace?.id}/project/${projectId}/team-members`, icon: <FaUsersCog />, label: "Team Members", permission: "view:teamMembers" },
    { to: `/${currentWorkspace?.id}/project/${projectId}/group-chat`, icon: <LuMessageSquare />, label: "Group Chat", permission: "view:connect" },
    { to: `/${currentWorkspace?.id}/project/${projectId}/calendar`, icon: <IoIosCalendar />, label: "Calendar", permission: "view:calendar" },
    { to: "/projects/reports", icon: <LuClipboard />, label: "Reports", permission: "view:reports" },
    { to: `/${currentWorkspace?.id}/project/${projectId}/activity-logs`, icon: <RxActivityLog />, label: "Activity Logs", permission: "view:activityLogs" },
    { to: "/${currentWorkspace?.id}/projects/settings", icon: <LuSettings />, label: "Settings", permission: "view:settings" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }}
        exit={{ x: 400, opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        className="w-64 space-y-4 rounded-lg mt-6"
      >
        <Card className="p-4">
          <Button variant="link" asChild className="text-blue-600 p-0">
            <Link to={`/${currentWorkspace?.id}/projects`} className="flex items-center">
              <IoIosArrowBack /> <span>Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">{project?.name}</h1>
        </Card>
        <Separator className="my-2" />
        <div className="space-y-2">
          {navItems.map(({ to, icon, label, permission }) => {
            // Only render if the user's role has the required permission.
            if (!hasPermission(role?.name, permission) && !isOwner) return null;
            return (
              <Button
                key={to}
                variant={isActive(to) ? "secondary" : "ghost"}
                asChild
                className="w-full justify-start gap-3 text-sm"
                onClick={() => dispatch(setSidebar(false))}
              >
                <Link to={to} className="flex items-center">
                  {icon} {label}
                </Link>
              </Button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectNavBar;
