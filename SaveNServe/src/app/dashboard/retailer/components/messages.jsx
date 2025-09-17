"use client";

import { MessageSquare, Bell, Plus, Search, Send, MoreVertical, ChevronLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Dummy data for conversations
const dummyConversations = [
  {
    id: "1",
    ngoName: "Food for All",
    ngoLogo: "/logos/food-for-all.png",
    lastMessage: "We've scheduled pickup for tomorrow at 10 AM",
    lastMessageTime: "2 hours ago",
    unreadCount: 1,
    messages: [
      {
        id: "1-1",
        sender: "ngo",
        content: "Hello! We'd like to schedule a pickup for your surplus items.",
        timestamp: "Yesterday, 3:45 PM",
        read: true,
      },
      {
        id: "1-2",
        sender: "retailer",
        content: "Sure, what time works for you?",
        timestamp: "Yesterday, 4:12 PM",
        read: true,
      },
      {
        id: "1-3",
        sender: "ngo",
        content: "We've scheduled pickup for tomorrow at 10 AM",
        timestamp: "2 hours ago",
        read: false,
      },
    ],
  },
  {
    id: "2",
    ngoName: "Shelter Foundation",
    ngoLogo: "/logos/shelter-foundation.png",
    lastMessage: "Thank you for your donation last week!",
    lastMessageTime: "1 day ago",
    unreadCount: 0,
    messages: [
      {
        id: "2-1",
        sender: "ngo",
        content: "Thank you for your donation last week!",
        timestamp: "1 day ago",
        read: true,
      },
    ],
  },
  {
    id: "3",
    ngoName: "Community Aid",
    ngoLogo: "/logos/community-aid.png",
    lastMessage: "We're expanding our operations to your area",
    lastMessageTime: "3 days ago",
    unreadCount: 0,
    messages: [
      {
        id: "3-1",
        sender: "ngo",
        content: "We're expanding our operations to your area",
        timestamp: "3 days ago",
        read: true,
      },
      {
        id: "3-2",
        sender: "retailer",
        content: "That's great news! Let me know how we can collaborate.",
        timestamp: "2 days ago",
        read: true,
      },
    ],
  },
];

// Dummy data for available NGOs
const availableNGOs = [
  {
    id: "4",
    name: "Hope Foundation",
    logo: "/logos/hope-foundation.png",
    description: "Providing meals to underprivileged communities",
  },
  {
    id: "5",
    name: "Green Earth",
    logo: "/logos/green-earth.png",
    description: "Reducing food waste through sustainable practices",
  },
  {
    id: "6",
    name: "Urban Relief",
    logo: "/logos/urban-relief.png",
    description: "Supporting urban communities in need",
  },
];

const Messages = () => {
  const [conversations, setConversations] = useState(dummyConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation]);

  // Mark messages as read when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      setConversations(prev =>
        prev.map(conv =>
          conv.id === selectedConversation.id
            ? { 
                ...conv, 
                unreadCount: 0, 
                messages: conv.messages.map(msg => ({ ...msg, read: true })) 
              }
            : conv
        )
      );
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: "retailer",
      content: newMessage,
      timestamp: "Just now",
      read: true,
    };

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMsg],
      lastMessage: newMessage,
      lastMessageTime: "Just now",
    };

    setSelectedConversation(updatedConversation);
    setConversations(prev =>
      prev.map(conv => (conv.id === selectedConversation.id ? updatedConversation : conv))
    );
    setNewMessage("");
  };

  const startNewChat = (ngo) => {
    const newConversation = {
      id: Date.now().toString(),
      ngoName: ngo.name,
      ngoLogo: ngo.logo,
      lastMessage: "",
      lastMessageTime: "",
      unreadCount: 0,
      messages: [],
    };

    setConversations(prev => [newConversation, ...prev]);
    setSelectedConversation(newConversation);
    setShowNewChat(false);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.ngoName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-100px)] flex bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Sidebar */}
      <div className={`w-full md:w-80 border-r ${selectedConversation ? "hidden md:block" : "block"}`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-teal-600" />
              Messages
            </h1>
            <button
              className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700 h-9 px-4 py-2"
              onClick={() => setShowNewChat(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              New Chat
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search conversations"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors pl-10 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {showNewChat ? (
          <div className="p-4">
            <div className="flex items-center mb-4">
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-2 mr-2"
                onClick={() => setShowNewChat(false)}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="font-semibold">New Message</h2>
            </div>

            <div className="space-y-3">
              {availableNGOs.map(ngo => (
                <div
                  key={ngo.id}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={() => startNewChat(ngo)}
                >
                  <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full mr-3">
                    <img 
                      src={ngo.logo} 
                      alt={ngo.name}
                      className="aspect-square h-full w-full"
                    />
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                      {ngo.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{ngo.name}</p>
                    <p className="text-xs text-gray-500">{ngo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto h-[calc(100%-80px)]">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No conversations found
              </div>
            ) : (
              filteredConversations.map(conv => (
                <div
                  key={conv.id}
                  className={`flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedConversation?.id === conv.id ? "bg-teal-50" : ""
                  }`}
                  onClick={() => setSelectedConversation(conv)}
                >
                  <div className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full mr-3">
                    <img 
                      src={conv.ngoLogo} 
                      alt={conv.ngoName}
                      className="aspect-square h-full w-full"
                    />
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                      {conv.ngoName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold truncate">{conv.ngoName}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {conv.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <div className="ml-2 w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs">
                      {conv.unreadCount}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-2 mr-2 md:hidden"
                onClick={() => setSelectedConversation(null)}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full mr-3">
                <img 
                  src={selectedConversation.ngoLogo} 
                  alt={selectedConversation.ngoName}
                  className="aspect-square h-full w-full"
                />
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                  {selectedConversation.ngoName.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="font-semibold">{selectedConversation.ngoName}</h2>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            <div className="relative">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-2">
                <MoreVertical className="w-5 h-5" />
              </button>
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden">
                <div className="py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    View NGO Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Donation History
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                    Delete Conversation
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {selectedConversation.messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                No messages yet. Start the conversation!
              </div>
            ) : (
              <div className="space-y-4">
                {selectedConversation.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "retailer" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                        msg.sender === "retailer"
                          ? "bg-teal-500 text-white"
                          : "bg-white border text-gray-800"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === "retailer" ? "text-teal-100" : "text-gray-500"
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <input
                placeholder="Type your message..."
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex-1 mr-2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700 h-9 px-4 py-2"
                onClick={handleSendMessage}
              >
                <Send className="w-4 h-4 mr-1" />
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
          <div className="text-center p-6 max-w-md">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Select a conversation
            </h3>
            <p className="text-gray-500 mb-4">
              Choose an existing conversation or start a new one to begin messaging.
            </p>
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700 h-9 px-4 py-2"
              onClick={() => setShowNewChat(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              New Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;