import Auth from "./pages/authentication/Auth";
import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
import Navigation from "./components/navigation_bar/Navigation";
import Tasks from "./pages/Tasks";
import ManageUsers from "./pages/ManageUsers";
import Alert from "./components/Alert";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import TopNav from "./components/topNav/TopNav";
import MobileNav from "./components/MobileNav";
import LandingPage from "./pages/landing page/LandingPage";
import BaseLayout from "./pages/BaseLayout";
import ViewUser from "./pages/view user/ViewUser";
import ShareKnowledge from "./pages/share knowledge/ShareKnowledge";
import Projects from "./pages/projects/Projects";
import Connect from "./pages/connect/Connect";
import AddProject from "./pages/add_project/AddProject";
import CalendarPage from "./pages/calendar/CalendarPage";

function App() {
  const { alert, darkMode } = useSelector((state) => state.globalState);
  const { pathname } = useLocation();

  return (
    <div
      className={`flex max-sm:p-[10px] w-screen ${
        !darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {pathname != "/login" &&
      "/signup" &&
      pathname != "/" &&
      pathname != "/forgot-password" ? (
        <div className="nav">
          <Navigation />
          <MobileNav />
        </div>
      ) : null}

      <div className="max-sm:my-10 max-sm:p-0 w-full h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Auth page="login" />} />
          <Route path="/signup" element={<Auth page="signup" />} />
          <Route path="/forgot-password" element={<Auth />} />
          <Route path="/verify-otp" element={<Auth />} />
          <Route element={<BaseLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project/:project_id/action-items/" element={<Tasks />} />
            <Route path="/project/:project_id/calendar/" element={<CalendarPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/mnjusers" element={<ManageUsers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/view-user" element={<ViewUser />} />
            <Route path="/share-knowledge" element={<ShareKnowledge />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/connect" element={<Connect />} />
          </Route>
        </Routes>
      </div>

      {alert.alert ? (
        <div className="alert absolute w-screen justify-center flex">
          <Alert />
        </div>
      ) : null}
    </div>
  );
}

export default App;
