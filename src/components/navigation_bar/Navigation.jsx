import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { fetchData, getAuthInfo } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../../store/features/appGlobalSlice";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import GenericNavBar from "./GenericNavBar";
import ProjectNavbar from "./ProjectNavbar";
import logo from "../../assets/logo.png";
import { setCurrentWorkspace, setWorkspaces } from "@/store/features/workspaceSlice";

const Navigation = () => {
  const { currentPage, sidebar, auth_info } = useSelector(
    (state) => state.globalState
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [close, setClose] = useState(false);
  const isProjectRoute = useMatch("/project/:project_id/*");

  useEffect(() => {
    if (
      pathname != "/login" &&
      pathname != "/signup" &&
      pathname != "/" &&
      pathname != "/role-selection" &&
      pathname != "/industry-selection" &&
      pathname != "/verify-otp"
    ) {
      getAuthInfo().token ? null : navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetchData("/workspaces").then((res) => {
      if (res.length === 0) {
        navigate("/select-workspace");
      } else {
        dispatch(setWorkspaces(res));
        dispatch(setCurrentWorkspace(res[0]));
      }
    });
  }, []);


  return (
    <div
      className={`flex overflow-hidden max-sm:absolute h-full top-0 ${
        sidebar ? "max-sm:right-0" : "max-sm:right-[1200px]"
      } transition-all relative`}
    >
      <div
        className={`text-white scrollbar-none max-sm:w-screen max-sm:h-screen flex flex-col transition-all justify-between ${
          close ? "w-0 p-0" : "w-72 p-[10px] "
        }  h-screen bg-blue-600`}
      >
      
        <div className="">
          {!close &&
          <div className="flex items-center px-4">
            <img width={50} className="rounded-full mr-2" src={logo} />
            <h1 className="text-3xl font-bold ">EasyAssigns</h1>
          </div>}

          <AiOutlineClose
            onClick={() => dispatch(setSidebar(false))}
            className="absolute w-[30px] h-[30px] hidden max-sm:flex right-5 top-5"
          />
          
          {isProjectRoute ? <ProjectNavbar /> : <GenericNavBar />}
        </div>
      </div>
      <div className="h-full flex items-center">
        <button
          onClick={() => setClose(!close)}
          className="rounded-tr-md bg-white rounded-br-md border border-slate-700 py-12"
        >
          {close ? <FaAngleRight className="" /> : <FaAngleLeft className="" />}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
