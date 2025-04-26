import React, { useEffect, useState, useCallback, useRef } from 'react';
import io from 'socket.io-client';
import axios from '../utils/axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, Smile, MoreVertical, Phone, Video, Loader } from 'lucide-react';
import BottomNav from './BottomNav';

const API_URL = 'http://localhost:3000';

const ChatPage = () => {
    const { chatId: urlChatId } = useParams();
    const location = useLocation();
    const chatId = urlChatId || location.state?.chatId;
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatDetails, setChatDetails] = useState(null);
    const [error, setError] = useState('');
    const [typingUsers, setTypingUsers] = useState(new Set());
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);
    const messageEndRef = useRef(null);
    const messageContainerRef = useRef(null);
    const navigate = useNavigate();

    // Initialize socket connection
    const initializeSocket = useCallback(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in localStorage');
            navigate('/login');
            return null;
        }

        console.log('Initializing socket connection with token:', token.substring(0, 10) + '...');
        const newSocket = io(API_URL, {
            auth: {
                token: token
            },
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            forceNew: true,
            autoConnect: true,
            path: '/socket.io/'
        });

        newSocket.on('connect', () => {
            console.log('Socket connected successfully');
            if (chatId) {
                newSocket.emit('join_chat', { chatId });
            }
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            if (error.message === 'Authentication error') {
                console.error('Authentication failed. Redirecting to login...');
                navigate('/login');
                return;
            }
            setError('Failed to connect to chat server');
        });

        return newSocket;
    }, [chatId, navigate]);

    // Fetch user data and initialize socket
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/auth/userprofile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data) {
                    setUserData(response.data);
                    const newSocket = initializeSocket();
                    if (newSocket) {
                        setSocket(newSocket);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchUserData();

        return () => {
            if (socket) {
                console.log('Cleaning up socket connection...');
                socket.disconnect();
            }
        };
    }, [navigate, initializeSocket]);

    // Set up socket event listeners
    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (data) => {
            console.log('Received message:', data);
            if (data.chatId === chatId) {
                setMessages(prev => {
                    // Check if message already exists
                    const messageExists = prev.some(msg => 
                        msg.content === data.message.content && 
                        msg.sender._id === data.message.sender._id &&
                        new Date(msg.timestamp).getTime() === new Date(data.message.timestamp).getTime()
                    );
                    
                    if (messageExists) return prev;
                    return [...prev, data.message];
                });
            }
        };

        socket.on('message', handleNewMessage);

        socket.on('typing', (data) => {
            if (data.chatId === chatId) {
                setTypingUsers(prev => {
                    const newUsers = new Set(prev);
                    if (data.isTyping) {
                        newUsers.add(data.userId);
                    } else {
                        newUsers.delete(data.userId);
                    }
                    return newUsers;
                });
            }
        });

        // Clean up function
        return () => {
            socket.off('message', handleNewMessage);
            socket.off('typing');
        };
    }, [socket, chatId]);

    // Fetch chat details
    useEffect(() => {
        const fetchChatDetails = async () => {
            if (!chatId) {
                console.log('No chatId provided');
                navigate('/chat');
                return;
            }

            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                console.log('Fetching chat details for chatId:', chatId);
                const response = await axios.get(`http://localhost:3000/api/chats/${chatId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data) {
                    setChatDetails(response.data);
                    setMessages(response.data.messages || []);
                } else {
                    setError('Failed to fetch chat details');
                }
            } catch (error) {
                console.error('Error fetching chat details:', error);
                setError(error.response?.data?.message || 'Failed to fetch chat details');
                if (error.response?.status === 404) {
                    navigate('/chat');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchChatDetails();
    }, [chatId, navigate]);

    // Auto-scroll to the bottom when new messages arrive
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !chatId || !socket || !userData) return;

        const messageContent = newMessage.trim();

        // Clear the input first
        setNewMessage('');

        // Emit the message to the server
        socket.emit('sendMessage', {
            chatId,
            content: messageContent
        });
    };

    const handleTyping = (e) => {
        setNewMessage(e.target.value);
        
        if (!socket || !chatId) return;
        
        // Emit typing event
        socket.emit('typing', {
            chatId,
            isTyping: e.target.value.length > 0
        });
    };

    const handleBackToChats = () => {
        navigate('/chat');
    };

    // Format timestamps
    const formatMessageTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Format dates for message groups
    const formatMessageDate = (timestamp) => {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString();
        }
    };

    // Generate avatar initials from username
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };

    // Generate consistent color based on username
    const getAvatarColor = (username) => {
        if (!username) return "#6366f1";
        
        const colors = [
            "#4f46e5", "#0ea5e9", "#06b6d4", "#10b981", 
            "#84cc16", "#eab308", "#f59e0b", "#ef4444",
            "#8b5cf6", "#d946ef", "#ec4899", "#f43f5e"
        ];
        
        const charSum = username.split('')
            .reduce((sum, char) => sum + char.charCodeAt(0), 0);
        
        return colors[charSum % colors.length];
    };

    // Group messages by date
    const messagesByDate = messages.reduce((groups, message) => {
        const date = formatMessageDate(message.timestamp);
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {});

    if (!chatId) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center p-6 max-w-sm mx-auto">
                    <div className="text-indigo-500 mb-4">
                        <MessageCircle className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900">No Chat Selected</h3>
                    <p className="mt-2 text-gray-500">Please select a chat to start messaging</p>
                    <button 
                        onClick={() => navigate('/chat')}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Go to Chats
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center">
                    <Loader className="h-10 w-10 mx-auto animate-spin text-indigo-500" />
                    <p className="mt-4 text-gray-600">Loading chat...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Chat Header */}
            <div className="bg-white shadow-sm z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center">
                            <button 
                                onClick={handleBackToChats}
                                className="mr-3 p-1.5 rounded-full hover:bg-gray-100"
                            >
                                <ArrowLeft className="h-5 w-5 text-gray-600" />
                            </button>
                            {chatDetails && (
                                <div className="flex items-center">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                                        style={{ 
                                            backgroundColor: getAvatarColor(
                                                chatDetails.participants.find(p => p._id !== userData?._id)?.username
                                            )
                                        }}
                                    >
                                        {getInitials(chatDetails.participants.find(p => p._id !== userData?._id)?.username)}
                                    </div>
                                    <div className="ml-3">
                                        <h2 className="font-medium text-gray-900">
                                            {chatDetails.participants.find(p => p._id !== userData?._id)?.username}
                                        </h2>
                                        <div className="flex items-center text-xs text-green-600">
                                            <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                                            Online
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                                <Phone className="h-5 w-5" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                                <Video className="h-5 w-5" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                                <MoreVertical className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Messages Container */}
            <div 
                className="flex-1 overflow-y-auto p-4 space-y-6" 
                ref={messageContainerRef}
            >
                {Object.entries(messagesByDate).map(([date, dateMessages]) => (
                    <div key={date} className="space-y-4">
                        <div className="flex justify-center">
                            <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                                {date}
                            </div>
                        </div>
                        
                        {dateMessages.map((message, index) => {
                            const isOwn = message.sender._id === userData?._id;
                            
                            // Group consecutive messages from the same sender
                            const showAvatar = index === 0 || 
                                dateMessages[index - 1]?.sender._id !== message.sender._id;
                            
                            return (
                                <div
                                    key={index}
                                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                                >
                                    {!isOwn && showAvatar && (
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2 flex-shrink-0"
                                            style={{ backgroundColor: getAvatarColor(message.sender.username) }}
                                        >
                                            {getInitials(message.sender.username)}
                                        </div>
                                    )}
                                    
                                    {!isOwn && !showAvatar && <div className="w-8 mr-2" />}
                                    
                                    <div
                                        className={`max-w-xs sm:max-w-md rounded-2xl px-4 py-2 break-words ${
                                            isOwn
                                                ? 'bg-indigo-600 text-white rounded-br-none'
                                                : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
                                        }`}
                                    >
                                        <div>{message.content}</div>
                                        <div className={`text-xs mt-1 ${isOwn ? 'text-indigo-200' : 'text-gray-400'}`}>
                                            {formatMessageTime(message.timestamp)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}

                {/* Typing indicator */}
                {typingUsers.size > 0 && (
                    <div className="flex items-center justify-start">
                        <div className="bg-white rounded-full p-3 shadow-sm">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty scroll area to allow scrolling to bottom */}
                <div ref={messageEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="max-w-6xl mx-auto">
                    <div className="flex items-end space-x-2">
                        <button
                            type="button"
                            className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <Paperclip className="h-5 w-5" />
                        </button>
                        <div className="flex-1 rounded-2xl border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 overflow-hidden">
                            <textarea
                                rows="1"
                                value={newMessage}
                                onChange={handleTyping}
                                placeholder="Type a message..."
                                className="block w-full px-4 py-3 resize-none border-0 focus:outline-none text-gray-900 placeholder-gray-400"
                                style={{ minHeight: "44px", maxHeight: "120px" }}
                            />
                        </div>
                        <button
                            type="button"
                            className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <Smile className="h-5 w-5" />
                        </button>
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className={`p-3 rounded-full focus:outline-none ${
                                newMessage.trim() 
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>
                </form>
            </div>
               </div>
    );
};

export default ChatPage;

// Add the MessageCircle component that was missing
const MessageCircle = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
    );
};