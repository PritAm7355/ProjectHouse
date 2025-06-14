import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProjectList = ({ projects, setProjects }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };
  const handleDelete = async (id) => {
    console.log("Deleting project with id:", id);
    try {
       await axios.delete(`${process.env.REACT_APP_API_URL}/api/projects/${id}`);
      setProjects((prev) => prev.filter((project) => project && project._id !== id));
    } catch (err) {
      console.error("Error deleting project", err);
    }
  };

  return (
    <div className="project-list">
         <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
      }}>
        <button 
          onClick={handleLogout} 
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#f44336', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          }}
        >
          Logout
        </button>
      </div>
      <h2>Project List</h2>
      {Array.isArray(projects) && projects.length > 0 ? (
        projects.map((project) =>
          project ? (
            <div className="project-card" key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>Price: ₹{project.price}</p>
              <p>
                Tech Stack:{" "}
                {project.techStack?.length
                  ? project.techStack.join(", ")
                  : project.stack?.length
                  ? project.stack.join(", ")
                  : "N/A"}
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
                  marginRight: "10px",
                }}
              >
                Download
              </a>
              <button onClick={() => handleDelete(project._id)}>Delete</button>
            </div>
          ) : null
        )
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
};

export default ProjectList;
