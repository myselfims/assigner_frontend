import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";

const BaseLayout = () => {
  return (
    <div className="p-4 w-full h-full overflow-y-scroll">
        <TopNav/>
      <Outlet />
    </div>
  );
};

export default BaseLayout;
