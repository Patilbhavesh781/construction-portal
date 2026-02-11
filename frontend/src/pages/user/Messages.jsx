import React, { useEffect, useMemo, useRef, useState } from "react";
import { Send, UserCircle } from "lucide-react";
import { io } from "socket.io-client";

import FadeIn from "../../components/animations/FadeIn";
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
        prev.some((m) => m._id && m._id === msg._id) ? prev : [...prev, msg]
      );
    };

    socket.on("chat:message", (msg) => {
      if (!msg) return;
      const isMine = msg.sender?._id === user._id || msg.recipient === user._id;
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
        prev.some((m) => m._id && m._id === sent._id) ? prev : [...prev, sent]
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
          Support Conversations
        </h1>
      </section>

      <section className="py-14 px-6 md:px-12 lg:px-16">
        <FadeIn>
          <div className="bg-white border border-gray-200 grid grid-cols-1 md:grid-cols-3 min-h-[560px] overflow-hidden">
            <div className="border-r border-gray-200 p-5 overflow-y-auto">
              <h2 className="text-xs uppercase tracking-widest text-gray-600 font-semibold mb-4">
                Conversations
              </h2>
              <div className="w-full flex items-center gap-3 p-4 border border-red-200 bg-red-50">
                <UserCircle className="w-8 h-8 text-gray-500" />
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="font-medium text-gray-900">Admin Support</p>
                  <p className="block max-w-full text-sm text-gray-500 truncate">
                    {lastMessage}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col">
              {user ? (
                <>
                  <div className="border-b border-gray-200 p-5">
                    <h3 className="text-lg font-light text-gray-900">Admin Support</h3>
                  </div>

                  <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-gray-50">
                    {messages.map((msg) => (
                      <div
                        key={msg._id || msg.id}
                        className={`flex ${
                          msg.sender?.role !== "admin" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[75%] px-4 py-3 text-sm border ${
                            msg.sender?.role !== "admin"
                              ? "bg-red-600 text-white border-red-600"
                              : "bg-white text-gray-800 border-gray-200"
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

                  <div className="border-t border-gray-200 p-4 flex items-center gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 border focus:ring-2 focus:ring-red-500 focus:outline-none"
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <Button onClick={handleSend} className="rounded-none">
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
      </section>
    </main>
  );
};

export default Messages;
