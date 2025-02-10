import { Outlet } from "react-router-dom";
import TopNav from "../components/topNav/TopNav";
import { AnimatePresence, motion } from "framer-motion"; // Import AnimatePresence and motion
import Navigation from "../components/navigation_bar/Navigation";
import MobileNav from "../components/MobileNav";

const BaseLayout = () => {
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
    </div>
  );
};

export default BaseLayout;
