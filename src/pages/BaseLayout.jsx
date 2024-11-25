import { Outlet } from "react-router-dom";
import TopNav from "../components/topNav/TopNav";

const BaseLayout = () => {
  return (
    <div className="p-4">
      <TopNav/>
      <Outlet />
    </div>
  );
};

export default BaseLayout;
