import api from "./api";

const PropertyService = {
  // Fetch all properties (public)
  getAllProperties: async () => {
    const response = await api.get("/properties");
    return response.data; // array of properties
  },

  // Fetch single property by ID (public)
  getPropertyById: async (propertyId) => {
    const response = await api.get(`/properties/${propertyId}`);
    return response.data; // property object
  },

  // Create new property (admin only)
  createProperty: async (propertyData) => {
    const response = await api.post("/properties", propertyData);
    return response.data; // created property
  },

  // Update property (admin only)
  updateProperty: async (propertyId, propertyData) => {
    const response = await api.put(`/properties/${propertyId}`, propertyData);
    return response.data; // updated property
  },

  // Delete property (admin only)
  deleteProperty: async (propertyId) => {
    const response = await api.delete(`/properties/${propertyId}`);
    return response.data; // message
  },
};

export default PropertyService;
