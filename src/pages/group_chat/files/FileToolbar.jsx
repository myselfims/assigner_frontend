import React from "react";

const FileToolbar = ({ searchQuery, setSearchQuery, sortOrder, setSortOrder, selectedFiles }) => {
  return (
    <div className="file-toolbar flex justify-between items-center p-4 bg-white shadow-md rounded-lg mb-4">
      {/* Search box */}
      <input
        type="text"
        placeholder="Search files..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-2/3 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      
      {/* Sort order buttons */}
      <div className="flex gap-4">
        <button
          className={`p-2 text-sm font-medium rounded-lg ${sortOrder === "newest" ? "bg-blue-500 text-white" : "bg-gray-100"} hover:bg-blue-400`}
          onClick={() => setSortOrder("newest")}
        >
          Newest
        </button>
        <button
          className={`p-2 text-sm font-medium rounded-lg ${sortOrder === "oldest" ? "bg-blue-500 text-white" : "bg-gray-100"} hover:bg-blue-400`}
          onClick={() => setSortOrder("oldest")}
        >
          Oldest
        </button>
      </div>
      
      {/* Selected files */}
      {selectedFiles.length > 0 && (
        <div className="text-sm text-gray-600">
          {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""} selected
        </div>
      )}
    </div>
  );
};

export default FileToolbar;
