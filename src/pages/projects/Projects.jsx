import React, { useState } from 'react'
import ProjectCard from './ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState([])

  return (
    <div>
      <h1>Hello</h1>
      <div className="w-full flex justify-between">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
      
    </div>
  )
}

export default Projects
