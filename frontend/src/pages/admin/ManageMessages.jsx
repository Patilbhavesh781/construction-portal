import React, { useEffect, useMemo, useRef, useState } from "react";
import { Send, UserCircle } from "lucide-react";
import { io } from "socket.io-client";

import FadeIn from "../../components/animations/FadeIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import ChatService from "../../services/chat.service";
import { useAuth } from "../../hooks/useAuth";

const ManageMessages = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [threads, setThreads] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      try {
        const data = await ChatService.getThreads();
        setThreads(data || []);
        if (data?.length) {
          setActiveUser(data[0].user);
        }
      } catch (error) {
        console.error("Failed to load threads", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchThreads();
    }
  }, [authLoading]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeUser?._id) return;
      try {
        const data = await ChatService.getMessages(activeUser._id);
        setMessages(data || []);
      } catch (error) {
        console.error("Failed to load messages", error);
      }
    };

    fetchMessages();
  }, [activeUser?._id]);

  useEffect(() => {
    if (!user?._id) return;
    const apiBase =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
    const socketUrl = apiBase.replace(/\/api\/?$/, "");
    const socket = io(socketUrl, { withCredentials: true });

    socket.on("connect", () => {
      socket.emit("join", { room: "admin" });
      if (activeUser?._id) {
        socket.emit("join", { room: `user:${activeUser._id}` });
      }
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
      const otherUserId =
        msg.sender?.role === "admin" ? msg.recipient : msg.sender?._id;
      if (!otherUserId) return;

      setThreads((prev) => {
        const existing = prev.find((t) => t.user?._id === otherUserId);
        const next = [
          {
            user: existing?.user || { _id: otherUserId, name: "User" },
            lastMessageAt: msg.createdAt,
            lastText: msg.text,
          },
          ...prev.filter((t) => t.user?._id !== otherUserId),
        ];
        return next;
      });

      if (activeUser?._id === otherUserId) {
        appendMessage(msg);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user?._id, activeUser?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const lastMessage = useMemo(() => {
    if (messages.length === 0) return "No messages yet.";
    return messages[messages.length - 1]?.text || "No messages yet.";
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || !activeUser?._id) return;
    try {
      const sent = await ChatService.sendMessage({
        text: message,
        userId: activeUser._id,
      });
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
    <main className="bg-white w-full overflow-x-hidden">
      <section className="py-10 px-6 md:px-12 lg:px-16 border-b border-gray-100">
        <span className="text-xs uppercase tracking-[0.35em] text-red-600 font-semibold">
          Messages
        </span>
        <h1 className="text-3xl md:text-5xl font-light text-gray-900 mt-4 leading-tight">
          Manage Messages
        </h1>
        <p className="mt-4 text-gray-600">
          Real-time chat between users and admin.
        </p>
      </section>

      {/* Messages Layout */}
      <section className="py-14 px-6 md:px-12 lg:px-16">
      <FadeIn>
        <div className="bg-white border border-gray-200 grid grid-cols-1 md:grid-cols-3 min-h-[500px] overflow-hidden">
          {/* Threads List */}
          <div className="border-r p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Conversations
            </h2>
            <div className="space-y-2">
              {threads.length === 0 && (
                <p className="text-sm text-gray-500">No conversations yet.</p>
              )}
              {threads.map((thread) => (
                <button
                  key={thread.user?._id}
                  onClick={() => setActiveUser(thread.user)}
                  className={`w-full min-w-0 flex items-center gap-3 p-3 rounded-lg text-left transition ${
                    activeUser?._id === thread.user?._id
                      ? "bg-orange-100 text-orange-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <UserCircle className="w-8 h-8 text-gray-500" />
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="font-medium truncate">{thread.user?.name}</p>
                    <p className="block max-w-full text-sm text-gray-500 truncate">
                      {thread.lastText || "No messages"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="md:col-span-2 flex flex-col">
            {activeUser ? (
              <>
                {/* Chat Header */}
                <div className="border-b p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {activeUser.name || "User"}
                  </h3>
                  <p className="text-sm text-gray-500">{lastMessage}</p>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                  {messages.map((msg) => (
                    <div
                      key={msg._id || msg.id}
                      className={`flex ${
                        msg.sender?.role === "admin"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow ${
                          msg.sender?.role === "admin"
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
                Select a conversation to start chatting.
              </div>
            )}
          </div>
        </div>
      </FadeIn>
      </section>
    </main>
  );
};

export default ManageMessages;
