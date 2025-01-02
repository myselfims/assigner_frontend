import React, { useEffect, useId, useState } from "react";
import ProjectCard from "./ProjectCard";
import AgileProjectCard from "./AgileProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../store/features/appGlobalSlice";
import SearchBar from "../../components/SearchBar";
import { Link } from "react-router-dom";
import { fetchData } from "../../api";

const Projects = () => {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    dispatch(setCurrentPage("Projects"));
    fetchData("/projects").then((res) => {
      console.log(res);
      setProjects(res);
    });
  }, []);

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  const handler = (query) => {
    let filtered = projects?.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  return (
    <div>
      <div className="header w-full flex justify-center mb-4">
        <div className=""></div>
        <SearchBar handler={handler} />
        <div className="">
          <select
            className="border-2 px-4 h-full mx-4 rounded-md"
            name=""
            id=""
          >
            <option defaultChecked value="">
              Priority
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <Link
          to={"/add-project"}
          className="px-2 h-full py-1 font-bold bg-[#4285F4] text-white rounded hover:opacity-70"
        >
          Add Project
        </Link>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {filteredProjects?.map((project, index) => (
          <AgileProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
