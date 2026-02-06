import api from "./api";

const ChatService = {
  // Admin: get conversation threads
  getThreads: async () => {
    const response = await api.get("/chat/threads");
    return response.data?.data || response.data || [];
  },

  // Get messages for current user (or specific user for admin)
  getMessages: async (userId) => {
    const response = await api.get("/chat/messages", {
      params: userId ? { userId } : {},
    });
    return response.data?.data || response.data || [];
  },

  // Send message (admin must pass userId)
  sendMessage: async ({ text, userId }) => {
    const response = await api.post("/chat/messages", { text, userId });
    return response.data?.data || response.data;
  },
};

export default ChatService;
