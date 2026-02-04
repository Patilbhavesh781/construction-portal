import React, { useEffect, useState, useRef } from "react";
import { Send, UserCircle } from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

const Messages = () => {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // TODO: Replace with real API calls
    const fetchMessages = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setConversations([
          {
            id: 1,
            name: "Support Team",
            lastMessage: "Your booking has been confirmed.",
            messages: [
              { id: 1, sender: "support", text: "Hello! How can we help you?", time: "10:00 AM" },
              { id: 2, sender: "user", text: "I want to confirm my booking status.", time: "10:02 AM" },
              { id: 3, sender: "support", text: "Your booking has been confirmed.", time: "10:05 AM" },
            ],
          },
          {
            id: 2,
            name: "Project Manager",
            lastMessage: "We’ll start work tomorrow.",
            messages: [
              { id: 1, sender: "support", text: "We’ll start work tomorrow.", time: "09:30 AM" },
            ],
          },
        ]);
        setActiveChat(1);
      } catch (error) {
        console.error("Failed to load messages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat, conversations]);

  const activeConversation = conversations.find((c) => c.id === activeChat);

  const handleSend = () => {
    if (!message.trim() || !activeConversation) return;

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeChat
          ? {
              ...conv,
              lastMessage: message,
              messages: [
                ...conv.messages,
                {
                  id: Date.now(),
                  sender: "user",
                  text: message,
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
            }
          : conv
      )
    );
    setMessage("");
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
          <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
          <p className="text-gray-600">
            Chat with our support team and project managers.
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
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setActiveChat(conv.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition ${
                    activeChat === conv.id
                      ? "bg-orange-100 text-orange-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <UserCircle className="w-8 h-8 text-gray-500" />
                  <div className="flex-1">
                    <p className="font-medium">{conv.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="md:col-span-2 flex flex-col">
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="border-b p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {activeConversation.name}
                  </h3>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                  {activeConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow ${
                          msg.sender === "user"
                            ? "bg-orange-600 text-white rounded-br-none"
                            : "bg-white text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className="text-xs mt-1 opacity-70 text-right">
                          {msg.time}
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
    </div>
  );
};

export default Messages;
