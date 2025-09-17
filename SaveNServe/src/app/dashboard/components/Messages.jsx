import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const MessageApp = () => {
  // State for conversations (threads) instead of individual messages
  const [conversations, setConversations] = useState([
    {
      id: 1,
      with: 'John Doe',
      avatar: 'JD',
      lastMessage: 'Hey, how are the crops looking?',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      unread: true,
      messages: [
        {
          id: 1,
          sender: 'John Doe',
          content: 'Hey, how are the crops looking?',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          type: 'incoming'
        }
      ]
    },
    {
      id: 2,
      with: 'Agri Supply Co.',
      avatar: 'AS',
      lastMessage: 'Your fertilizer order is ready for pickup',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      unread: false,
      messages: [
        {
          id: 1,
          sender: 'Agri Supply Co.',
          content: 'Your fertilizer order is ready for pickup',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          type: 'incoming'
        },
        {
          id: 2,
          sender: 'You',
          content: 'Thanks, I\'ll come by tomorrow',
          timestamp: new Date(Date.now() - 82800000).toISOString(),
          type: 'outgoing'
        }
      ]
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [newContact, setNewContact] = useState('');
  
  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv => 
    conv.with.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        const newMsg = {
          id: conv.messages.length + 1,
          sender: "You",
          content: newMessage,
          timestamp: new Date().toISOString(),
          type: "outgoing"
        };
        
        return {
          ...conv,
          lastMessage: newMessage,
          timestamp: new Date().toISOString(),
          messages: [...conv.messages, newMsg],
          unread: false
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setSelectedConversation(updatedConversations.find(c => c.id === selectedConversation.id));
    setNewMessage("");
    toast.success("Message sent");
  };

  // Mark conversation as read when selected
  const markAsRead = (conversationId) => {
    setConversations(conversations.map(conv => 
      conv.id === conversationId ? {...conv, unread: false} : conv
    ));
  };

  // Start a new conversation
  const startNewConversation = () => {
    if (!newContact.trim()) return;
    
    const newConv = {
      id: conversations.length + 1,
      with: newContact,
      avatar: newContact.split(' ').map(n => n[0]).join('').toUpperCase(),
      lastMessage: '',
      timestamp: new Date().toISOString(),
      unread: false,
      messages: []
    };
    
    setConversations([newConv, ...conversations]);
    setSelectedConversation(newConv);
    setNewContact('');
    setIsNewMessageModalOpen(false);
    toast.success(`New conversation with ${newContact} started`);
  };

  // Handle key press for sending message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
        <button 
          onClick={() => setIsNewMessageModalOpen(true)}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          New Message
        </button>
      </div>
  
      <div className="flex flex-1 gap-6">
        {/* Conversation List */}
        <div className="w-1/3 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <input 
              type="text" 
              placeholder="Search conversations..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="divide-y divide-gray-200 overflow-y-auto max-h-[calc(100vh-300px)]">
            {filteredConversations.map(conversation => (
              <div 
                key={conversation.id}
                onClick={() => {
                  setSelectedConversation(conversation);
                  markAsRead(conversation.id);
                }}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation?.id === conversation.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-800 font-medium">{conversation.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className={`text-gray-900 truncate ${
                        conversation.unread ? "font-semibold" : ""
                      }`}>
                        {conversation.with}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {new Date(conversation.timestamp).toLocaleTimeString([], {
                          hour: '2-digit', 
                          minute:'2-digit'
                        })}
                      </span>
                    </div>
                    <p className={`text-sm truncate mt-1 ${
                      conversation.unread ? "text-gray-900 font-medium" : "text-gray-600"
                    }`}>
                      {conversation.lastMessage || 'No messages yet'}
                    </p>
                  </div>
                </div>
                {conversation.unread && (
                  <span className="inline-block mt-2 ml-12 w-2 h-2 rounded-full bg-blue-500"></span>
                )}
              </div>
            ))}
          </div>
        </div>
  
        {/* Message Content */}
        <div className="flex-1 flex flex-col bg-white rounded-xl border border-gray-200">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <span className="text-teal-800 font-medium">{selectedConversation.avatar}</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">{selectedConversation.with}</h3>
                  <p className="text-xs text-gray-500">
                    {selectedConversation.messages.length > 0 ? 
                      `Last active: ${new Date(selectedConversation.timestamp).toLocaleString()}` : 
                      'New conversation'}
                  </p>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {selectedConversation.messages.length > 0 ? (
                  selectedConversation.messages.map(message => (
                    <div 
                      key={message.id}
                      className={`flex ${
                        message.type === "outgoing" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "outgoing" 
                          ? "bg-teal-100 text-teal-900" 
                          : "bg-gray-100 text-gray-900"
                      }`}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs mt-1 text-gray-500">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    No messages yet. Start the conversation!
                  </div>
                )}
              </div>
  
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Message ${selectedConversation.with}...`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg resize-none"
                    rows="1"
                    onKeyDown={handleKeyPress}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation or start a new one
            </div>
          )}
        </div>
      </div>

      {/* New Message Modal */}
      {isNewMessageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">New Message</h3>
            <input
              type="text"
              value={newContact}
              onChange={(e) => setNewContact(e.target.value)}
              placeholder="Enter contact name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsNewMessageModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={startNewConversation}
                disabled={!newContact.trim()}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50 hover:bg-teal-700"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageApp;