import api from "./api";

const PropertyService = {
  // Fetch all properties (public)
  getAllProperties: async () => {
    const response = await api.get("/properties");
    return response.data?.data || response.data; // array of properties
  },

  // Fetch single property by ID (public)
  getPropertyById: async (propertyId) => {
    const response = await api.get(`/properties/${propertyId}`);
    return response.data?.data || response.data; // property object
  },

  // Create new property (admin only)
  createProperty: async (propertyData) => {
    const isFormData =
      typeof FormData !== "undefined" && propertyData instanceof FormData;
    const response = await api.post(
      "/properties",
      propertyData,
      isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {}
    );
    return response.data?.data || response.data; // created property
  },

  // Update property (admin only)
  updateProperty: async (propertyId, propertyData) => {
    const isFormData =
      typeof FormData !== "undefined" && propertyData instanceof FormData;
    const response = await api.put(
      `/properties/${propertyId}`,
      propertyData,
      isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {}
    );
    return response.data?.data || response.data; // updated property
  },

  // Delete property (admin only)
  deleteProperty: async (propertyId) => {
    const response = await api.delete(`/properties/${propertyId}`);
    return response.data?.data || response.data; // message
  },
};

export default PropertyService;
