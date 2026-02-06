import api from "./api";

const MessageService = {
  // Admin: fetch all messages
  getAllMessages: async () => {
    const response = await api.get("/messages");
    return response.data?.data || response.data;
  },

  // Admin: mark message as read
  markAsRead: async (messageId) => {
    const response = await api.patch(`/messages/${messageId}/read`);
    return response.data?.data || response.data;
  },

  // Admin: delete message
  deleteMessage: async (messageId) => {
    const response = await api.delete(`/messages/${messageId}`);
    return response.data?.data || response.data;
  },
};

export default MessageService;
