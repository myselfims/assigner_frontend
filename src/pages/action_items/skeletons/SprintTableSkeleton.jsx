import React from "react";

const SprintTableSkeleton = () => {
  return (
    <div className="flex flex-col my-6 bg-slate-200 rounded-lg">
      {/* Table Skeleton */}
      <div className="table-auto max-sm:hidden max-sm:text-xs w-full text-start">
        <div className="static rounded-md ">
          {/* Header */}
          <div className="bg-slate-300 animate-pulse rounded-md h-8 w-1/4 mb-4"></div>
          {/* Column Titles */}
          <div className="bg-slate-300 animate-pulse h-6 w-full rounded-md flex">
            <div className="w-[20px] h-full mx-2 bg-slate-300"></div>
            <div className="w-[600px] h-full mx-2 bg-slate-300"></div>
            <div className="w-[150px] h-full mx-2 bg-slate-300"></div>
            <div className="w-[150px] h-full mx-2 bg-slate-300"></div>
            <div className="w-[150px] h-full mx-2 bg-slate-300"></div>
          </div>
        </div>
        {/* Table Rows */}
        <div className="bg-white animate-pulse space-y-3 mt-4">
          {Array(5)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center w-full h-6 rounded-md bg-slate-300"
              >
                <div className="w-[20px] h-full mx-2 bg-slate-300"></div>
                <div className="w-[600px] h-full mx-2 bg-slate-300"></div>
                <div className="w-[150px] h-full mx-2 bg-slate-300"></div>
                <div className="w-[150px] h-full mx-2 bg-slate-300"></div>
                <div className="w-[150px] h-full mx-2 bg-slate-300"></div>
              </div>
            ))}
        </div>
      </div>

      {/* Mobile Skeleton */}
      <div className="max-sm:flex flex-col hidden space-y-4">
        {Array(3)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col p-4 bg-white rounded-lg shadow-sm animate-pulse"
            >
              <div className="h-4 w-1/2 bg-slate-300 rounded-md mb-2"></div>
              <div className="h-4 w-1/3 bg-slate-300 rounded-md mb-2"></div>
              <div className="h-4 w-3/4 bg-slate-300 rounded-md mb-2"></div>
              <div className="h-4 w-1/4 bg-slate-300 rounded-md"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SprintTableSkeleton;
