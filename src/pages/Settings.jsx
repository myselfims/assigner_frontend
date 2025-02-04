import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setDarkMode } from "../store/features/appGlobalSlice";
import ToggleBtn from "../components/ToggleBtn";
import { FiLock, FiSettings, FiUser } from "react-icons/fi";

const Settings = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.globalState);

  useEffect(() => {
    dispatch(setCurrentPage("Settings"));
  }, [dispatch]);

  const handleDarkMode = (newState) => {
    console.log("darkmode called...");
    dispatch(setDarkMode(newState)); // Pass the new state directly from ToggleBtn
  };

  return (
    <div className="w-full flex dark:bg-transparent bg-gray-100 flex-wrap">
      {/* Privacy Settings */}
      <div className="flex flex-col border-2 w-96 rounded p-4 m-4 bg-white dark:bg-transparent dark:text-white">
        <h5 className="text-slate-700 dark:text-gray-200 text-lg font-semibold mb-4">
          <FiLock className="inline-block mr-2" /> Privacy
        </h5>
        <div className="flex justify-between my-2">
          <p>Show online status</p>
          <ToggleBtn value={false} handler={() => {}} />
        </div>
        <div className="flex justify-between my-2">
          <p>Private profile</p>
          <ToggleBtn value={false} handler={() => {}} />
        </div>
        <div className="flex justify-between my-2">
          <p>Two-factor Authentication</p>
          <ToggleBtn value={false} handler={() => {}} />
        </div>
      </div>

      {/* Visual Settings */}
      <div className="border-2 w-96 rounded p-4 m-4 bg-white dark:bg-transparent">
        <h5 className="text-slate-700 dark:text-gray-200 text-lg font-semibold mb-4">
          <FiSettings className="inline-block mr-2" /> Visuals
        </h5>
        <div className="flex justify-between my-2">
          <p>Dark Mode</p>
          <ToggleBtn value={darkMode} handler={handleDarkMode} />
        </div>
        <div className="flex justify-between my-2">
          <p>Show Animations</p>
          <ToggleBtn value={false} handler={() => {}} /> 
        </div>
      </div>

      {/* Project Management Settings */}
      <div className="border-2 w-96 rounded p-4 m-4 bg-white dark:bg-transparent">
        <h5 className="text-slate-700 dark:text-gray-200 text-lg font-semibold mb-4">
          <FiUser className="inline-block mr-2" /> Project Management
        </h5>
        <div className="flex justify-between my-2">
          <p>Task Notifications</p>
          <ToggleBtn value={false} handler={() => {}} />
        </div>
        <div className="flex justify-between my-2">
          <p>Auto Assign Tasks</p>
          <ToggleBtn value={false} handler={() => {}} />
        </div>
        <div className="flex justify-between my-2">
          <p>Project Archive</p>
          <ToggleBtn value={false} handler={() => {}} />
        </div>
      </div>

      {/* User Settings */}
      <div className="border-2 w-96 rounded p-4 m-4 bg-white dark:bg-transparent">
        <h5 className="text-slate-700 dark:text-gray-200 text-lg font-semibold mb-4">
          <FiUser className="inline-block mr-2" /> User Settings
        </h5>
        <div className="flex justify-between my-2">
          <p>Email Notifications</p>
          <ToggleBtn value={false} handler={() => {}} />
        </div>
        <div className="flex justify-between my-2">
          <p>Profile Visibility</p>
          <ToggleBtn value={false} handler={() => {}} />
        </div>
        <div className="flex justify-between my-2">
          <p>Change Password</p>
          <button className="text-blue-500 hover:underline">Change</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
