import api from "./api";

const ServiceService = {
  // Fetch all services (public)
  getAllServices: async (options = {}) => {
    const response = await api.get("/services");
    let data = response.data?.data || response.data || [];

    if (options.category) {
      data = data.filter((service) => service.category === options.category);
    }

    if (options.limit) {
      data = data.slice(0, options.limit);
    }

    return data; // array of services
  },

  // Fetch single service by ID (public)
  getServiceById: async (serviceId) => {
    const response = await api.get(`/services/${serviceId}`);
    return response.data?.data || response.data; // service object
  },

  // Create new service (admin only)
  createService: async (serviceData) => {
    const response = await api.post("/services", serviceData);
    return response.data?.data || response.data; // created service
  },

  // Update service (admin only)
  updateService: async (serviceId, serviceData) => {
    const response = await api.put(`/services/${serviceId}`, serviceData);
    return response.data?.data || response.data; // updated service
  },

  // Delete service (admin only)
  deleteService: async (serviceId) => {
    const response = await api.delete(`/services/${serviceId}`);
    return response.data?.data || response.data; // message
  },
};

export default ServiceService;
