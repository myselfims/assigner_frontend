import React from "react";
import { FiDownload, FiBookmark, FiMoreVertical } from "react-icons/fi";

const FileCard = ({ file, handleSelectFile, isSelected }) => {
  const { id, name, type, date, url } = file;

  return (
    <div
                key={file.id}
                className={`border p-3 rounded-md ${
                  isSelected
                    ? 'bg-blue-100 border-blue-400'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleSelectFile(file.id)}
              >
                {/* File Preview */}
                <div className="mb-2">
                  {file.type === 'image' ? (
                    <img src={file.url} alt={file.name} className="w-full h-32 object-cover rounded-md" />
                  ) : file.type === 'pdf' ? (
                    <div className="flex items-center justify-center bg-gray-200 h-32 rounded-md">
                      <span>PDF</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center bg-gray-200 h-32 rounded-md">
                      <span>{file.type.toUpperCase()}</span>
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-700">{file.name}</div>

                {/* Actions */}
                <div className="flex justify-between mt-2">
                  <button onClick={() => handleDownload(file)} className="text-blue-500 hover:underline">
                    <FiDownload />
                  </button>
                  <button onClick={() => handleBookmark(file)} className="text-blue-500 hover:underline">
                    <FiBookmark />
                  </button>
                </div>
              </div>
  );
};

export default FileCard;
