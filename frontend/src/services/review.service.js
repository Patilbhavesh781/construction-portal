import api from "./api";

const ReviewService = {
  // Admin: fetch all reviews
  getAllReviews: async () => {
    const response = await api.get("/reviews");
    return response.data?.data || response.data;
  },

  // Admin: approve/reject review
  updateReviewStatus: async (reviewId, isApproved) => {
    const response = await api.patch(`/reviews/${reviewId}/status`, {
      isApproved,
    });
    return response.data?.data || response.data;
  },

  // Admin: delete review
  deleteReview: async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data?.data || response.data;
  },
};

export default ReviewService;
