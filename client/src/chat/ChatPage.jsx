import React, { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import axios from '../utils/axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

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
            }
        };

        fetchChatDetails();
    }, [chatId, navigate]);

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

    if (!chatId) {
        return <div className="error-message">No chat selected</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {error && <div className="bg-red-100 text-red-700 p-4">{error}</div>}
            {chatDetails && (
                <div className="bg-white shadow-md p-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {chatDetails.participants.find(p => p._id !== userData?._id)?.username}
                    </h2>
                </div>
            )}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender._id === userData?._id ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                                message.sender._id === userData?._id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-800'
                            }`}
                        >
                            <div className="text-sm">{message.content}</div>
                            <div className="text-xs mt-1 opacity-70">
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="bg-white p-4 shadow-md">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatPage;
