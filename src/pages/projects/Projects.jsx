import React, { useEffect, useState, useCallback } from "react";
import ProjectCard from "./ProjectCard";
import AgileProjectCard from "./AgileProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../store/features/appGlobalSlice";
import SearchBar from "../../components/SearchBar";
import { Link } from "react-router-dom";
import { fetchData } from "../../api";
import debounce from "lodash/debounce";
import AgileProjectCardSkeleton from "./AgileProjectCardSkeleton";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";

const Projects = () => {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(setCurrentPage("Projects"));
    setLoading(true);
    fetchData("/projects")
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
          setProjects(res || []);
          setFilteredProjects(res || []);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [dispatch]);

  const handler = useCallback(
    debounce((query) => {
      if (!query?.trim()) {
        setFilteredProjects(projects || []);
        return;
      }

      const lowerCaseQuery = query.toLowerCase();
      const filtered = projects.filter((project) =>
        project?.name?.toLowerCase().includes(lowerCaseQuery)
      );

      setFilteredProjects(filtered || []);
    }, 300),
    [projects]
  );

  const sortByPriority = (selectedPriorities) => {
    console.log(selectedPriorities); // Log the selected priorities
    if (!selectedPriorities || selectedPriorities.length === 0) {
      // If no priorities are selected, show all projects
      setFilteredProjects(projects);
      return;
    }
  
    const filtered = projects.filter((project) =>
      selectedPriorities.some(
        (priority) => project?.priority?.toLowerCase() === priority.toLowerCase()
      )
    );
  
    console.log(filtered); // Log the filtered projects
    setFilteredProjects(filtered);
  };

  useEffect(()=>{
    console.log(filteredProjects)
  },[filteredProjects])
  

  return (
    <div>
      <div className="header w-full flex mb-4 justify-between items-center">
        <div className="flex items-center">
          <SearchBar handler={handler} />
          <div>
            <Dropdown
              name={'Filter by Priority'}
              onSelect={(e) => sortByPriority(e)}
              allowMultiple={true}
              options={[
                { name: "Low", value: "low" },
                { name: "Medium", value: "medium" },
                { name: "High", value: "high" },
              ]}
              className={'mx-4'}
            />
          </div>
        </div>
        <Button to="/add-project" className="text-white">
        Add Project
      </Button>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {loading
          ? Array(3)
              .fill()
              .map((_, index) => <AgileProjectCardSkeleton key={index} />)
          : filteredProjects?.map((project, index) => (
              <AgileProjectCard key={index} project={project} />
            ))}
      </div>
    </div>
  );
};

export default Projects;
