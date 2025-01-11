import React, { useState } from "react";
import { BiBell } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { MdLogout } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.currentUser);
  const {pathname} = useLocation()

  const logout = () => {
    localStorage.removeItem("auth_info");
    navigate("/login");
  };

  const current = useSelector((state) => state.globalState.currentPage);
  return (
    <>
      {pathname=='/'? null :
    <div className="head justify-between w-full my-6 flex sticky top-1 bg-white rounded-lg py-2 px-2">
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
        <Link to={'/share-knowledge'} className="bg-blue-600 text-white p-2 rounded-md">Share Knowledge</Link>
        <div className="flex items-center">
          <BiBell className="mr-[27px] ml-[46px] w-[18px] cursor-pointer h-[20px]" />
          <div
            className="w-[30px] overflow-hidden group cursor-pointer bg-center bg-no-repeat bg-cover rounded-full h-[30px] flex items-center justify-center bg-gradient-to-t from-blue-500 to-blue-300 text-white font-serif
              "
          >
            {user.avatar ? (
              <img src={user.avatar} alt="" />
            ) : (
              <h1 className="font-bold text-2xl">I</h1>
            )}
            <div className="absolute group-hover:flex hidden hover:flex rounded pt-20">
              <button
                onClick={logout}
                className="text-blue-500 hover:opacity-80 bg-white p-1 flex items-center justify-center rounded"
              >
                <MdLogout />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> }
    </>
  );
};

export default TopNav;
