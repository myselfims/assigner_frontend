import { Outlet } from "react-router-dom";
import TopNav from "../components/topNav/TopNav";
import { AnimatePresence, motion } from "framer-motion"; // Import AnimatePresence and motion
import Navigation from "../components/navigation_bar/Navigation";
import MobileNav from "../components/MobileNav";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RequestModal from "@/components/RequestModal";

const BaseLayout = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.globalState)
  const {currentWorkspace} = useSelector(state=>state.workspaceState)

  useEffect(() => {
    let userId = user?.id
    if (userId) {
      dispatch({ type: "socket/connect", payload: { userId } });
    }

    return () => {
      dispatch({ type: "socket/disconnect" });
    };
  }, [user?.id, dispatch]);

  useEffect(() => {
    let workspaceId = currentWorkspace?.id;
    let userId = user?.id;
  
    if (workspaceId) {
      dispatch({ type: "workspace/socketConnect", payload: { workspaceId, userId } });
    }
  
    const handleTabClose = () => {
      dispatch({ type: "workspace/socketDisconnect", payload: { workspaceId, userId } });
    };
  
    window.addEventListener("beforeunload", handleTabClose);
  
    return () => {
      dispatch({ type: "workspace/socketDisconnect", payload: { workspaceId, userId } });
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [currentWorkspace?.id, user?.id, dispatch]);
  

  return (
    <div className="w-full flex">
      <div className="nav">
        <Navigation />
        <MobileNav />
      </div>

      <div className="w-full overflow-hidden">
        <TopNav />
        {/* Animate the page transitions */}
        <AnimatePresence mode="wait">
          {" "}
          {/* Using mode="wait" */}
          <motion.div
          // key={window.location.pathname} // Ensures that the animation happens on route change
          // initial={{ x: 800, opacity: 0 }} // Start off-screen and invisible
          // animate={{ x: 0, opacity: 1 }} // Animate to original position and full opacity
          // // exit={{ x: -800, opacity: 0 }} // Exit to the left with fade-out
          // transition={{ duration: 0.5 }} // Transition duration
          className="h-[93vh] overflow-y-scroll p-4"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
      <RequestModal />
    </div>
  );
};

export default BaseLayout;
