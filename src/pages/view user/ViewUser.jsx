import React, { useState } from "react";
import { LuMessagesSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import KnowledgeCard from "../../components/knowledge card/KnowledgeCard";

const ViewUser = () => {
  const [follow, setFollow] = useState(false);

  return (
    <div className="w-full h-full">
      <div className="header w-full flex justify-between">
        <div className="flex items-end">
          <div className="w-20 h-20 hover:border-2 text-6xl border-black bg-red-700 mx-1 p-2 flex justify-center rounded-full items-center">
            K
          </div>
          <div className="mx-4">
            <h1 className="text-3xl font-semibold">Karan Khan</h1>
            <p>Software Engineer</p>
            <Link className="hover:text-blue-600 ">ViziSmart</Link>
            <Link className="hover:text-blue-600 mx-2">Toloka</Link>
            <Link className="hover:text-blue-600">Skylight</Link>
          </div>
        </div>
        <div className="flex items-center">
          <button className="bg-blue-600 text-white rounded-lg p-2 flex items-center justify-center">
            {" "}
            <LuMessagesSquare className="w-[18px] h-[18px] mr-1" /> Connect
          </button>
          <button
            onClick={() => setFollow(!follow)}
            className="border-blue-500 text-black rounded-lg p-2 flex items-center justify-center mx-4"
          >
            {" "}
            <LuMessagesSquare className="w-[18px] h-[18px] mr-1" />{" "}
            {follow ? "Following" : "Follow"}
          </button>
        </div>
      </div>

      <div className="body w-full mt-10 ">
        <div className="header w-full flex justify-between sticky top-14">
          <button className="p-2 border w-full bg-blue-200">
            Action Items
          </button>
          {/* Comment on timeline or a blame feature */}
          <button className="p-2 border w-full bg-blue-200">Timeline</button>
          <button className="p-2 border w-full bg-blue-200">Permissions</button>

          <button className="p-2 border w-full bg-blue-200 font-bold">
            Knowledge
          </button>
        </div>

        <div className="body w-full my-8 border p-4 rounded-lg">
            <KnowledgeCard />
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
