import React from "react";
import axios from "axios";


const ProjectList = ({ projects, setProjects }) => {
  const handleDelete = async (id) => {
    console.log("Deleting project with id:", id);
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (err) {
      console.error("Error deleting project", err);
    }
  };

  return (
    <div className="project-list">
      <h2>Project List</h2>
      {projects.map((project) => (
        <div className="project-card" key={project._id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>Price: ₹{project.price}</p>
          <p>
  Tech Stack: {
    project.techStack?.length
      ? project.techStack.join(", ")
      : project.stack?.length
        ? project.stack.join(", ")
        : "N/A"
  }
</p>

          <a
            href={project.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              borderRadius: "4px",
              textDecoration: "none",
              marginRight: "10px"
            }}
          >
            Download
          </a>
          <button onClick={() => handleDelete(project._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
export default ProjectList;