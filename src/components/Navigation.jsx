import React, { useEffect } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuSettings } from "react-icons/lu";
import {FaTasks} from 'react-icons/fa';
import {FaUsersGear} from 'react-icons/fa6'
import {AiOutlineClose} from 'react-icons/ai'
import { Link, useNavigate } from "react-router-dom";
import { getAuthInfo } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../store/features/appGlobalSlice";

const Navigation = () => {
  const {currentPage, sidebar} = useSelector(state=>state.globalState)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    getAuthInfo().token?null:navigate('/login')
  },[])
  
  return (
    <div className={`flex z-10 max-sm:absolute top-0 ${sidebar?'max-sm:right-0':'max-sm:right-[1200px]'} transition-all relative`}>
      <div className="text-white max-sm:w-screen max-sm:h-screen flex flex-col justify-between w-[280px] h-screen rounded-[20px] p-[50px] bg-[#4285F4]">
        <div className="">
          <h1 className="text-4xl font-bold">Assigner.</h1>
          <AiOutlineClose onClick={()=>dispatch(setSidebar(false))} className="absolute w-[30px] h-[30px] hidden max-sm:flex right-5 top-5"/>
          <div className="btns my-[60px] h-56 flex text-lg justify-between flex-col">
            <Link onClick={()=>dispatch(setSidebar(false))} to={'/'} className={`flex ${currentPage=='Dashboard'?'font-bold':null} items-center`}>
              <AiOutlineDashboard className="w-[18px] h-[18px] mr-[20px]" />
              Dashboard
            </Link>
            <Link onClick={()=>dispatch(setSidebar(false))} to={'/tasks'} className={`flex ${currentPage=='Tasks'?'font-bold':null} items-center`}>
              <FaTasks className="w-[18px] h-[18px] mr-[20px]" />
              Tasks
            </Link>
            {getAuthInfo().isAdmin?
            <Link onClick={()=>dispatch(setSidebar(false))} to={'/mnjusers'} className={`flex ${currentPage=='Manage Users'?'font-bold':null} items-center`}>
              <FaUsersGear className="w-[18px] h-[18px] mr-[20px]" />
              Manage Users
            </Link>:null}
            <Link onClick={()=>dispatch(setSidebar(false))} to={'/profile'} className={`flex ${currentPage=='Profile'?'font-bold':null} items-center`}>
              <FaRegCircleUser className="w-[18px] h-[18px] mr-[20px]" />
              Profile
            </Link>
            <Link onClick={()=>dispatch(setSidebar(false))} to={'/settings'} className={`flex ${currentPage=='Settings'?'font-bold':null} items-center`}>
              <LuSettings className="w-[18px] h-[18px] mr-[20px]" />
              Settings
            </Link>
          </div>
        </div>
        <div className="flex justify-start items-start flex-col">
          <button className="my-[20px]">Help</button>
          <button>Contact Us</button>
        </div>
      </div>

    </div>
  );
};

export default Navigation;
