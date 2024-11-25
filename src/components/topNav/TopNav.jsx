import React, { useState } from "react";
import { BiBell } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { MdLogout } from "react-icons/md";
import { useLocation, useNavigate, Link } from "react-router-dom";
import NotificationsDropdown from "./NotificationsDropdown";

const TopNav = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.currentUser);
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [notiDropdown, setNotiDropdown] = useState(false);

  const logout = () => {
    localStorage.removeItem("auth_info");
    navigate("/login");
  };

  const current = useSelector((state) => state.globalState.currentPage);
  return (
    <>
      {pathname == "/" ? null : (
        <div className="head z-30 select-none justify-between w-full my-6 flex relative">
          <h1 className="font-bold text-2xl">{current}</h1>
          <div className="flex items-center">
            <div className=" hidden items-center border-2 px-4 rounded-full">
              <input
                placeholder="Search..."
                className=" p-2 outline-none"
                type="text"
              />
              <BsSearch className="w-[12px] h-[12px] " />
            </div>
            <div className="flex items-center">
              <div className="relative mr-8">
                <div className="relative w-[30px] h-[30px]">
                  <BiBell onClick={()=>setNotiDropdown(!notiDropdown)} className={`mr-[27px] w-full h-full p-1 rounded-full ${notiDropdown? 'bg-slate-200': null}  cursor-pointer ` }/>
                  <span className="absolute top-1 right-1 text-xs bg-red-500 p-1 rounded-full w-2 h-2"></span>

                </div>
                  {notiDropdown?
                <NotificationsDropdown />:null}
              </div>

              <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-[30px] overflow-hidden group cursor-pointer bg-center bg-no-repeat bg-cover rounded-full h-[30px] flex items-center justify-center bg-gradient-to-t from-blue-500 to-blue-300 text-white font-serif
              "
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="" />
                ) : (
                  <h1 className="font-bold text-2xl">I</h1>
                )}
              </div>

              {isOpen && (
                <div className="absolute top-8 right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <ul className="py-1 text-gray-700 w-full">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full flex items-center">
                    <Link to={'/profile'} className="w-full h-full block text-left">
                      Profile
                    </Link>
                  </li>
                  <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Upgrade
                  </li>
                  <li onClick={logout} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
              
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;
