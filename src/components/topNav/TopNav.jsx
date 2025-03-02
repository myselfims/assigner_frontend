import React, { useState } from "react";
import { BiBell } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import NotificationsDropdown from "./NotificationsDropdown";
import Tooltip from "../Tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [notiDropdown, setNotiDropdown] = useState(false);
  const current = useSelector((state) => state.globalState.currentPage);

  const logout = () => {
    localStorage.removeItem("auth_info");
    navigate("/login");
  };

  return (
    <>
      {pathname !== "/" && (
        <div className="head z-40 select-none justify-between items-center my-3 flex relative">
          <h1 className="font-bold text-2xl">{current}</h1>
          <div className="flex items-center">
            <div className="hidden items-center border-2 px-4 rounded-full">
              <input
                placeholder="Search..."
                className="p-2 outline-none"
                type="text"
              />
              <BsSearch className="w-[12px] h-[12px]" />
            </div>
            <div className="flex items-center mr-8">
              <div className="relative mr-8 flex items-center">
                <NotificationsDropdown setNotiDropdown={setNotiDropdown} />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Upgrade</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;
