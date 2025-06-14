import React, { useState } from "react";
import axios from "axios";

const AddProjectForm = ({ onProjectAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    techStack: "",
    file: null,
     demoLink: "", // for zip upload
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const uploadToGoFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // Optional: If you have a permanent token and want to upload to your account
    formData.append("token", "LYTmKwM2T7CTEib1bjNQ4hpCK113dkxe");

    // ✅ Use global upload endpoint
    const response = await axios.post(
      "https://upload.gofile.io/uploadFile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.status !== "ok") {
      throw new Error("Upload failed: " + response.data.status);
    }

    const { downloadPage, fileId } = response.data.data;
    console.log("✅ GoFile Upload Successful:", downloadPage);
    return { downloadPage, fileId };
  } catch (error) {
    console.error("❌ GoFile upload failed:", error);
    throw new Error("Upload to GoFile failed");
  }
};


  const handleSubmit = async (e) => {
  e.preventDefault();

  const techStackArray = formData.techStack
    .split(",")
    .map((tech) => tech.trim());

  try {
    const gofileResponse = await uploadToGoFile(formData.file); 
    if (!formData.file) {
      setStatus("❌ Please upload a ZIP file.");
      return;
    }

    // ✅ Upload file to GoFile instead of Cloudinary
    const downloadLink = await uploadToGoFile(formData.file);

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/projects`, {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      techStack: techStackArray,
   downloadLink: gofileResponse.downloadPage, 
      demoLink: formData.demoLink,
    });

    setStatus("✅ Project added successfully!");
    onProjectAdded(response.data);

    setFormData({
      title: "",
      description: "",
      price: "",
      techStack: "",
      file: null,
      demoLink: "",
    });

    setTimeout(() => setStatus(""), 3000);
  } catch (err) {
    console.error(err);
    setStatus("❌ Error adding project.");
  }
};


  return (
    <div className="project-form-container">
      <h2 className="form-heading">Add New Project</h2>
      {status && <p className="status-message">{status}</p>}
      <form onSubmit={handleSubmit} className="form-grid">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="form-input"
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className="form-input textarea"
          rows={3}
        />
        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (comma separated)"
          value={formData.techStack}
          onChange={handleChange}
          className="form-input"
        />
        <input
  type="url"
  placeholder="Live Demo URL"
  value={formData.demoLink}
  onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
/>

        <input
  type="file"
  name="file"
  accept=".zip,.7z"
  onChange={handleChange}
  className="form-input"
  required
/>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProjectForm;