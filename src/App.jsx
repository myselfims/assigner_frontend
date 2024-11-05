import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useLocation,

} from "react-router-dom";
import Navigation from "./components/Navigation";
import Tasks from "./pages/Tasks";
import ManageUsers from "./pages/ManageUsers";
import Alert from "./components/Alert";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import TopNav from "./components/TopNav";
import MobileNav from "./components/MobileNav";
import LandingPage from "./pages/landing page/LandingPage";
import BaseLayout from "./pages/BaseLayout";


function App() {
  const {alert,darkMode} = useSelector(state=>state.globalState)
  const {pathname} = useLocation()

  return (
    <div className={`flex max-sm:p-[10px] w-screen ${!darkMode?'bg-black text-white':'bg-white text-black'}`}>

      {pathname != '/login' && '/signup' && pathname != '/'?
      <div className="nav">
        <Navigation />
        <MobileNav/>
      </div>:null}

      <div className="max-sm:my-10 max-sm:p-0 w-full">
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route element={<BaseLayout/>} >
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/tasks' element={<Tasks />}/>
            <Route path='/login' element={<Auth page='login'/>}/>
            <Route path='/signup' element={<Auth  page='signup'/>}/>
            <Route path='/mnjusers' element={<ManageUsers/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/settings' element={<Settings/>}/>
          </Route>
        </Routes>

      </div>

    {alert.alert?
    <div className="alert absolute w-screen justify-center flex">
      <Alert/>
    </div>:null}
    </div>
  )
}

export default App
