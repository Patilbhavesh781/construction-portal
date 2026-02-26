import React, { useEffect, useMemo, useState } from "react";
import { Search, Mail, Trash2, CheckCircle2 } from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import MessageService from "../../services/message.service";

const ManageEnquiries = () => {
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEnquiries = async () => {
      setLoading(true);
      try {
        const data = await MessageService.getAllMessages();
        setEnquiries(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load enquiries", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const filteredEnquiries = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return enquiries;
    return enquiries.filter((item) =>
      [item.name, item.email, item.subject, item.message]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [enquiries, search]);

  const markAsRead = async (id) => {
    setActionLoadingId(id);
    try {
      const updated = await MessageService.markAsRead(id);
      setEnquiries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...updated } : item))
      );
    } catch (error) {
      console.error("Failed to mark enquiry as read", error);
    } finally {
      setActionLoadingId("");
    }
  };

  const deleteEnquiry = async (id) => {
    setActionLoadingId(id);
    try {
      await MessageService.deleteMessage(id);
      setEnquiries((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete enquiry", error);
    } finally {
      setActionLoadingId("");
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
      <SlideIn direction="down">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Enquiries</h1>
          <p className="text-gray-600">
            Contact and enquiry submissions from the website.
          </p>
        </div>
      </SlideIn>

      <FadeIn>
        <div className="bg-white rounded-2xl border shadow-sm p-4 md:p-5">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search enquiries..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-white rounded-2xl border shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-600">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Mail className="w-6 h-6 text-gray-400" />
                      <span>No enquiries found.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {item.name || "-"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.email || "-"}</td>
                    <td className="py-3 px-4 text-gray-700">{item.subject || "-"}</td>
                    <td className="py-3 px-4 text-gray-600 max-w-[360px]">
                      <p className="line-clamp-3 whitespace-pre-line">
                        {item.message || "-"}
                      </p>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : "-"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.isRead
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.isRead ? "Read" : "Unread"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      {!item.isRead && (
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={actionLoadingId === item._id}
                          onClick={() => markAsRead(item._id)}
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="danger"
                        disabled={actionLoadingId === item._id}
                        onClick={() => deleteEnquiry(item._id)}
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
    </div>
  );
};

export default ManageEnquiries;
