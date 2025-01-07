import React from "react";

const AgileProjectCardSkeleton = () => {
  return (
    <div className="w-[90%] p-4 my-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="animate-pulse">
        {/* Title */}
        <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-4"></div>

        {/* User Info */}
        <div className="flex items-center my-2 space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
        </div>

        {/* Team Size */}
        <div className="h-4 bg-gray-300 rounded-md w-1/3 mb-4"></div>

        {/* Status and Priority */}
        <div className="flex justify-between mt-2">
          <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
        </div>

        {/* Current Sprint Info */}
        <div className="mt-4">
          <div className="h-5 bg-gray-300 rounded-md w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
        </div>

        {/* Tasks */}
        <div className="mt-4">
          <div className="h-5 bg-gray-300 rounded-md w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default AgileProjectCardSkeleton;
