import React, { useEffect, useState } from "react";
import { Search, CheckCircle, XCircle, Trash2, Eye } from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import ReviewService from "../../services/review.service";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const data = await ReviewService.getAllReviews();
        setReviews(data || []);
        setFilteredReviews(data || []);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    const filtered = reviews.filter(
      (r) =>
        r.user?.name?.toLowerCase().includes(lower) ||
        r.comment?.toLowerCase().includes(lower) ||
        r.title?.toLowerCase().includes(lower) ||
        r.targetType?.toLowerCase().includes(lower)
    );
    setFilteredReviews(filtered);
  }, [search, reviews]);

  const updateStatus = async (review, isApproved) => {
    try {
      const updated = await ReviewService.updateReviewStatus(
        review._id,
        isApproved
      );
      setReviews((prev) =>
        prev.map((r) => (r._id === review._id ? updated : r))
      );
      setFilteredReviews((prev) =>
        prev.map((r) => (r._id === review._id ? updated : r))
      );
    } catch (error) {
      console.error("Failed to update review status", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await ReviewService.deleteReview(selectedReview._id);
      setReviews((prev) =>
        prev.filter((r) => r._id !== selectedReview._id)
      );
      setFilteredReviews((prev) =>
        prev.filter((r) => r._id !== selectedReview._id)
      );
      setShowDeleteModal(false);
      setSelectedReview(null);
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <SlideIn direction="down">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Reviews
          </h1>
          <p className="text-gray-600">
            Approve, reject, and manage customer reviews.
          </p>
        </div>
      </SlideIn>

      {/* Search */}
      <FadeIn>
        <div className="bg-white rounded-2xl shadow-md border p-5">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by user, title, comment, target..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>
      </FadeIn>

      {/* Reviews Table */}
      <FadeIn delay={0.1}>
        <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-600">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Target</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-gray-600"
                  >
                    No reviews found.
                  </td>
                </tr>
              ) : (
                filteredReviews.map((review) => (
                  <tr
                    key={review._id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {review.user?.name || "Unknown"}
                    </td>
                    <td className="py-3 px-4 text-gray-600 capitalize">
                      {review.targetType}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {review.rating}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          review.isApproved
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {review.isApproved ? "approved" : "pending"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedReview(review);
                          setShowDetailsModal(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {review.isApproved ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateStatus(review, false)}
                        >
                          <XCircle className="w-4 h-4 text-red-600" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateStatus(review, true)}
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                          setSelectedReview(review);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </FadeIn>

      {/* Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Review Details"
      >
        {selectedReview && (
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>User:</strong> {selectedReview.user?.name || "-"}
            </p>
            <p>
              <strong>Target:</strong> {selectedReview.targetType}
            </p>
            <p>
              <strong>Rating:</strong> {selectedReview.rating}
            </p>
            <p>
              <strong>Title:</strong> {selectedReview.title || "-"}
            </p>
            <p>
              <strong>Comment:</strong> {selectedReview.comment || "-"}
            </p>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Review"
      >
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this review by{" "}
          <span className="font-semibold">
            {selectedReview?.user?.name || "unknown user"}
          </span>
          ?
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ManageReviews;
