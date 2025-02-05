import React, { useState, useEffect } from 'react';
import { FiDownload, FiBookmark, FiSearch } from 'react-icons/fi';
import FileCard from './FileCard';

// Helper function to group files by month and year
const groupFilesByMonth = (files) => {
  const grouped = {};

  files.forEach((file) => {
    const date = new Date(file.date);
    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    grouped[monthYear].push(file);
  });

  return grouped;
};

const FileGallery = ({ files }) => {
  const [search, setSearch] = useState('');
  const [sortedFiles, setSortedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    setSortedFiles(groupFilesByMonth(files));
  }, [files]);

  const handleDownload = (file) => {
    console.log(`Downloading ${file.name}`);
  };

  const handleBookmark = (file) => {
    console.log(`Bookmarking ${file.name}`);
  };

  const handleSelectFile = (fileId) => {
    setSelectedFiles((prevState) =>
      prevState.includes(fileId)
        ? prevState.filter((id) => id !== fileId)
        : [...prevState, fileId]
    );
  };

  // Filter files based on search input
  const filteredFiles = Object.keys(sortedFiles).reduce((acc, monthYear) => {
    const filteredFilesForMonth = sortedFiles[monthYear].filter((file) =>
      file.name.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredFilesForMonth.length > 0) {
      acc[monthYear] = filteredFilesForMonth;
    }
    return acc;
  }, {});

  return (
    <div className="bg-white p-4">
      {/* Search Box */}
      <div className="sticky mb-4 top-1">
        <input
          type="text"
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <FiSearch className="absolute top-4 left-3 text-gray-400" />
      </div>

      {/* Files List */}
      {Object.keys(filteredFiles).map((monthYear) => (
        <div key={monthYear} className="mb-8">
          {/* Month Divider */}
          <div className="text-xl font-semibold text-gray-700 mb-4">
            {monthYear}
          </div>

          {/* Files for this month */}
          <div className="grid grid-cols-3 gap-4">
            {filteredFiles[monthYear].map((file) => (
              <FileCard file={file} onSelect={selectedFiles} handleSelectFile={handleSelectFile} isSelected={selectedFiles.includes(file.id)}/>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileGallery;
