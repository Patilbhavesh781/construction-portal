import api from "./api";

const BookingService = {
  // Create a new booking (user)
  createBooking: async (bookingData) => {
    const response = await api.post("/bookings", bookingData);
    return response.data?.data || response.data; // created booking
  },

  // Get all bookings (admin only)
  getAllBookings: async () => {
    const response = await api.get("/bookings");
    return response.data?.data || response.data; // array of bookings
  },

  // Get bookings of logged-in user
  getMyBookings: async () => {
    const response = await api.get("/bookings/my-bookings");
    return response.data?.data || response.data; // array of bookings
  },

  // Get single booking by ID (admin or owner)
  getBookingById: async (bookingId) => {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data?.data || response.data; // booking object
  },

  // Update booking (admin only)
  updateBooking: async (bookingId, bookingData) => {
    const response = await api.put(`/bookings/${bookingId}/status`, bookingData);
    return response.data?.data || response.data; // updated booking
  },

  // Delete booking (admin only)
  deleteBooking: async (bookingId) => {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data?.data || response.data; // message
  },
};

export default BookingService;
