import React from 'react';

const ProjectCard = ({ project }) => {
  const { name, leadUser, teamSize, startDate, status, priority, description, progress } = project;

  return (
    <div className="max-w-sm p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <p className="text-gray-600 text-sm">Lead: {leadUser?.name}</p>
      <p className="text-gray-600 text-sm">Team Size: {teamSize}</p>
      <p className="text-gray-600 text-sm">Started: {startDate}</p>
      <p className={`text-sm font-medium mt-2 ${status === 'Ongoing' ? 'text-blue-500' : status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
        Status: {status}
      </p>
      <p className={`text-sm font-medium ${priority === 'High' ? 'text-red-500' : priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
        Priority: {priority}
      </p>
      <p className="text-gray-600 mt-2 text-sm">{description}</p>
      <div className="mt-4">
        <div className="flex items-center justify-between text-gray-600 text-sm">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
          <div
            className="h-2 rounded-full bg-blue-600"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
