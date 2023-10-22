import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,

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


function App() {
  const {alert,darkMode} = useSelector(state=>state.globalState)

  return (
    <div className={`flex max-sm:p-[10px] p-[43px] w-screen ${!darkMode?'bg-black text-white':'bg-white text-black'}`}>
    <Router>
      <div className="nav">
        <Navigation />
        <MobileNav/>
      </div>
      <div className="max-sm:my-10 px-[43px] max-sm:p-0 w-full">
        <TopNav/>
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/tasks' element={<Tasks />}/>
          <Route path='/login' element={<Auth page='login'/>}/>
          <Route path='/signup' element={<Auth  page='signup'/>}/>
          <Route path='/mnjusers' element={<ManageUsers/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>

      </div>

    </Router>
    {alert.alert?
    <div className="alert absolute w-screen justify-center flex">
      <Alert/>
    </div>:null}
    </div>
  )
}

export default App
