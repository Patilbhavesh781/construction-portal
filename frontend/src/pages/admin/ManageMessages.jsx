import React, { useEffect, useState } from "react";
import { Search, Eye, Trash2, CheckCircle } from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import MessageService from "../../services/message.service";

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const data = await MessageService.getAllMessages();
        setMessages(data || []);
        setFilteredMessages(data || []);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    const filtered = messages.filter(
      (msg) =>
        msg.name?.toLowerCase().includes(lower) ||
        msg.email?.toLowerCase().includes(lower) ||
        msg.subject?.toLowerCase().includes(lower) ||
        msg.message?.toLowerCase().includes(lower)
    );
    setFilteredMessages(filtered);
  }, [search, messages]);

  const openDetailsModal = (msg) => {
    setSelectedMessage(msg);
    setShowDetailsModal(true);
  };

  const confirmDelete = async () => {
    try {
      await MessageService.deleteMessage(selectedMessage._id);
      setMessages((prev) =>
        prev.filter((m) => m._id !== selectedMessage._id)
      );
      setFilteredMessages((prev) =>
        prev.filter((m) => m._id !== selectedMessage._id)
      );
      setShowDeleteModal(false);
      setSelectedMessage(null);
    } catch (error) {
      console.error("Failed to delete message", error);
    }
  };

  const markAsRead = async (msg) => {
    try {
      const updated = await MessageService.markAsRead(msg._id);
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? updated : m))
      );
      setFilteredMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? updated : m))
      );
    } catch (error) {
      console.error("Failed to mark message as read", error);
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
            Manage Messages
          </h1>
          <p className="text-gray-600">
            View and manage user contact messages.
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
              placeholder="Search by name, email, subject, message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>
      </FadeIn>

      {/* Messages Table */}
      <FadeIn delay={0.1}>
        <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-600">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-gray-600"
                  >
                    No messages found.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr
                    key={msg._id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {msg.name || "Unknown"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{msg.email}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {msg.subject || "-"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          msg.isRead
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {msg.isRead ? "read" : "unread"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openDetailsModal(msg)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {!msg.isRead && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(msg)}
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                          setSelectedMessage(msg);
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
        title="Message Details"
      >
        {selectedMessage && (
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Name:</strong> {selectedMessage.name || "-"}
            </p>
            <p>
              <strong>Email:</strong> {selectedMessage.email || "-"}
            </p>
            <p>
              <strong>Subject:</strong> {selectedMessage.subject || "-"}
            </p>
            <p>
              <strong>Message:</strong> {selectedMessage.message || "-"}
            </p>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Message"
      >
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this message from{" "}
          <span className="font-semibold">
            {selectedMessage?.name || "unknown user"}
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

export default ManageMessages;
