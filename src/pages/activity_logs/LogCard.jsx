import CustomAvatar from "@/components/Avatar";
import { boldText, formatChatTimestamp } from "@/globalFunctions";
import React from "react";

const LogCard = ({ log }) => {
  return (
    <li
      className="text-sm border-b py-1 hover:bg-slate-1
                00"
    >
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center hover:text-blue-500 text-gray-600 cursor-pointer">
            <CustomAvatar
              src={log?.user?.avatar}
              fallback={"CN"}
              className={"cursor-pointer border-[3px] w-5 h-5"}
            />
            <h1 className="text-xs">{log?.user?.name}</h1>
          </div>
          <h1 className="text-xs">{formatChatTimestamp(log?.createdAt)}</h1>
        </div>
        <p
          className={`${
            log?.redirectUrl &&
            "hover:underline cursor-pointer hover:text-blue-600"
          } cursor-default`}
          dangerouslySetInnerHTML={{ __html: boldText(log?.message) }}
        ></p>
      </div>
    </li>
  );
};

export default LogCard;
