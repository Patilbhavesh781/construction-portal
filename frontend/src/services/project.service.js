import api from "./api";

const ProjectService = {
  // Fetch all projects (public)
  getAllProjects: async () => {
    const response = await api.get("/projects");
    return response.data?.data || response.data; // array of projects
  },

  // Fetch single project by ID (public)
  getProjectById: async (projectId) => {
    const response = await api.get(`/projects/${projectId}`);
    return response.data?.data || response.data; // project object
  },

  // Create new project (admin only)
  createProject: async (projectData) => {
    const response = await api.post("/projects", projectData);
    return response.data?.data || response.data; // created project
  },

  // Update project (admin only)
  updateProject: async (projectId, projectData) => {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response.data?.data || response.data; // updated project
  },

  // Delete project (admin only)
  deleteProject: async (projectId) => {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data?.data || response.data; // message
  },
};

export default ProjectService;
