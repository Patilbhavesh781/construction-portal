import React, { useEffect, useMemo, useRef, useState } from "react";
import { Send, UserCircle } from "lucide-react";
import { io } from "socket.io-client";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import ChatService from "../../services/chat.service";
import { useAuth } from "../../hooks/useAuth";

const Messages = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        if (!user?._id) return;
        const data = await ChatService.getMessages();
        setMessages(data || []);
      } catch (error) {
        console.error("Failed to load messages", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchMessages();
    }
  }, [authLoading, user?._id]);

  useEffect(() => {
    if (!user?._id) return;
    const apiBase =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
    const socketUrl = apiBase.replace(/\/api\/?$/, "");
    const socket = io(socketUrl, { withCredentials: true });

    socket.on("connect", () => {
      socket.emit("join", { room: `user:${user._id}` });
    });

    const appendMessage = (msg) => {
      setMessages((prev) =>
        prev.some((m) => m._id && m._id === msg._id)
          ? prev
          : [...prev, msg]
      );
    };

    socket.on("chat:message", (msg) => {
      if (!msg) return;
      const isMine =
        msg.sender?._id === user._id || msg.recipient === user._id;
      if (!isMine) return;
      appendMessage(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, [user?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const lastMessage = useMemo(() => {
    if (messages.length === 0) return "No messages yet.";
    return messages[messages.length - 1]?.text || "No messages yet.";
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      const sent = await ChatService.sendMessage({ text: message });
      setMessages((prev) =>
        prev.some((m) => m._id && m._id === sent._id)
          ? prev
          : [...prev, sent]
      );
      setMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  if (loading || authLoading) {
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
          <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
          <p className="text-gray-600">
            Chat with our support team in real time.
          </p>
        </div>
      </SlideIn>

      {/* Messages Layout */}
      <FadeIn>
        <div className="bg-white rounded-2xl shadow-md border grid grid-cols-1 md:grid-cols-3 min-h-[500px] overflow-hidden">
          {/* Conversations List */}
          <div className="border-r p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Conversations
            </h2>
            <div className="space-y-2">
              <div className="w-full flex items-center gap-3 p-3 rounded-lg text-left bg-orange-100 text-orange-700">
                <UserCircle className="w-8 h-8 text-gray-500" />
                <div className="flex-1">
                  <p className="font-medium">Admin Support</p>
                  <p className="text-sm text-gray-500 truncate">
                    {lastMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div className="md:col-span-2 flex flex-col">
            {user ? (
              <>
                {/* Chat Header */}
                <div className="border-b p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Admin Support
                  </h3>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                  {messages.map((msg) => (
                    <div
                      key={msg._id || msg.id}
                      className={`flex ${
                        msg.sender?.role !== "admin"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow ${
                          msg.sender?.role !== "admin"
                            ? "bg-orange-600 text-white rounded-br-none"
                            : "bg-white text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p>{msg.text || msg.message}</p>
                        <p className="text-xs mt-1 opacity-70 text-right">
                          {msg.createdAt
                            ? new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t p-4 flex items-center gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button onClick={handleSend}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Please log in to view messages.
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default Messages;
