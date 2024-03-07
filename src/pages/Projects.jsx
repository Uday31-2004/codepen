import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdBookmark } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Projects = () => {
  const projects = useSelector((state) => state?.project?.projects);
  const searchQuery = useSelector((state) =>
    state?.search?.searchQuery ? state?.search?.searchQuery : ""
  );
  console.log(searchQuery);
  const [filtered, setFiltered] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFiltered(
        projects?.filter((project) => {
          const lowerCaseItem = project?.title?.toLowerCase();
          return searchQuery
            .split("")
            .every((letter) => lowerCaseItem.includes(letter));
        })
      );
    } else {
      setFiltered(null);
    }
  }, [searchQuery]);

  return (
    <div className="w-full py-6 flex items-center justify-center gap-6 flex-wrap">
      {filtered ? (
        <>
          {filtered &&
            filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                //onClick={onProjectClick}
              /> // Add this prop/>
            ))}
        </>
      ) : (
        <>
          {projects &&
            projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                //onClick={onProjectClick}
              /> // Add this prop/>
            ))}
        </>
      )}
    </div>
  );
};
const ProjectCard = ({ project, index, onClick }) => {
  const navigate = useNavigate();

  const handleProjectClick = () => {
    const id =project.id
    navigate("/home/projects/" +id); // Call navigate with the project id
  };
  return (
    <motion.div
      onClick={handleProjectClick}
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.2 }}
      className="w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary rounded-md flex flex-col items-center justify-center p-4"
    >
      <div
        className="bg-primary w-full h-full rounded-md overflow-hidden"
        style={{ overflow: "hidden", height: "100%" }}
      >
        <iframe
          title="Result"
          srcDoc={project.output}
          style={{ border: "none", width: "100%", height: "100%" }}
        />
      </div>
      <div className="flex items-center justify-start gap-3 w-full">
        <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
          {project?.userPhoto ? (
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={project?.userPhoto}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-xl text-white font-semibold capitalize">
              {project?.username[0]}
            </p>
          )}
        </div>
        {/*name */}
        <div>
          <p className="text-white text-lg capitalize">{project?.title}</p>
          <p className="text-primaryText text-sm">{project?.username}</p>
        </div>
        {/*collection */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="ml-auto cursor-pointer"
        >
          <MdBookmark className="text-primaryText text-3xl" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
