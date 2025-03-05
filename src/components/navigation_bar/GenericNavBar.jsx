import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar, setRole } from "../../store/features/appGlobalSlice";
import { fetchData } from "@/api";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { LuMessageSquare, LuSettings, LuUserCog } from "react-icons/lu";
import { RxActivityLog } from "react-icons/rx";
import { FaRegCreditCard } from "react-icons/fa6";
import { CiLock } from "react-icons/ci";
import WorkspaceSelector from "./WorkspaceSelector";
import { setMembers } from "@/store/features/actionItemsSlice";
import { Badge } from "@/components/ui/badge";
import { hasPermission } from "@/access/role_permissions";

const GenericNavBar = () => {
  const { currentPage, role, user } = useSelector((state) => state.globalState);
  const { workspaces, currentWorkspace } = useSelector(
    (state) => state.workspaceState
  );
  const { unreadCounts } = useSelector((state) => state.connectState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  const totalUnreadCount = Object.values(unreadCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  useEffect(() => {
    if (currentWorkspace?.id) {
      fetchData(`/workspaces/${currentWorkspace?.id}/users`).then((res) => {
        let users = res.workspaceUsers.map((u) => ({
          ...u.user,
          role: u.role.name,
          createdAt: u.createdAt,
        }));
        dispatch(setMembers(users));
      });
    } else {
      dispatch(setRole("guest")); // Default role when no workspaceId is available
    }
  }, [currentWorkspace?.id]);

  // Define nav items with a required permission property.
  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: AiOutlineDashboard,
      permission: "view:dashboard",
    },
    {
      to: `/${currentWorkspace?.id}/projects`,
      label: "Projects",
      icon: FaTasks,
      permission: "view:projects",
    },
    {
      to: `/${currentWorkspace?.id}/connect`,
      label: "Connect",
      icon: LuMessageSquare,
      permission: "view:connect", // add this permission in your ROLE_PERMISSIONS if needed
    },
    {
      to: `/${currentWorkspace?.id}/activity-logs`,
      label: "Activity Logs",
      icon: RxActivityLog,
      permission: "view:activityLogs",
    },
    {
      to: `/${currentWorkspace?.id}/settings`,
      label: "Settings",
      icon: LuSettings,
      permission: "view:workspace", // adjust based on your needs
    },
  ];

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      exit={{
        x: 200,
        opacity: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      className="w-64 mt-8 h-screen p-4 flex flex-col select-none"
    >
      {/* Workspace Selection */}
      <Card className="mb-4 p-3 shadow-md">
        <WorkspaceSelector
          workspaces={workspaces}
          currentWorkspace={currentWorkspace}
        />
      </Card>

      {!currentWorkspace ? (
        <div className="flex flex-col items-center justify-center backdrop-blur-md w-full text-white rounded-lg p-4 text-center">
          <CiLock className="w-10 h-10" />
          <h1 className="text-sm mt-2">
            Create a new workspace to get started.
          </h1>
        </div>
      ) : (
        <div className="space-y-2">
          {navItems.map(({ to, label, icon: Icon, permission }) => {
            // Check if user has the permission to view this link.
            if (!hasPermission(role?.name, permission)) return null;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                  currentPage === label
                    ? "bg-[#f1f5f9] text-black"
                    : "hover:bg-gray-100 hover:text-slate-700"
                }`}
                onClick={() => dispatch(setSidebar(false))}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium ">{label}</span>
                {label === "Connect" && <Badge>{totalUnreadCount}</Badge>}
              </Link>
            );
          })}
          {/* Custom Links for Manage Users and Billing, with their own permission logic */}
          {hasPermission(role?.name, "view:teamMembers") && (
            <Link
              to={`/${currentWorkspace?.id}/mnjusers`}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-slate-700 text-white"
              onClick={() => dispatch(setSidebar(false))}
            >
              <LuUserCog className="w-5 h-5" />
              <span className="font-medium">Manage Users</span>
            </Link>
          )}
          {hasPermission(role?.name, "view:subscription") && (
            <Link
              to="/billing"
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-slate-700 text-white"
              onClick={() => dispatch(setSidebar(false))}
            >
              <FaRegCreditCard className="w-5 h-5" />
              <span className="font-medium">Billing & Subscription</span>
            </Link>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default GenericNavBar;
