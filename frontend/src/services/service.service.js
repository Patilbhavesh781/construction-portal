import api from "./api";

const ServiceService = {
  // Fetch all services (public)
  getAllServices: async () => {
    const response = await api.get("/services");
    return response.data; // array of services
  },

  // Fetch single service by ID (public)
  getServiceById: async (serviceId) => {
    const response = await api.get(`/services/${serviceId}`);
    return response.data; // service object
  },

  // Create new service (admin only)
  createService: async (serviceData) => {
    const response = await api.post("/services", serviceData);
    return response.data; // created service
  },

  // Update service (admin only)
  updateService: async (serviceId, serviceData) => {
    const response = await api.put(`/services/${serviceId}`, serviceData);
    return response.data; // updated service
  },

  // Delete service (admin only)
  deleteService: async (serviceId) => {
    const response = await api.delete(`/services/${serviceId}`);
    return response.data; // message
  },
};

export default ServiceService;
