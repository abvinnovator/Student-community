import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:5000';

const ChatPage = () => {
    const { chatId } = useParams();
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatDetails, setChatDetails] = useState(null);
    const [error, setError] = useState('');
    const [typingUsers, setTypingUsers] = useState(new Set());
    const [newMessage, setNewMessage] = useState('');
    const navigate = useNavigate();

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`${API_URL}/auth/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.success) {
                    setUserData(response.data.user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate]);

    // Initialize socket connection
    useEffect(() => {
        if (!chatId || !userData) return;

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        console.log('Initializing socket connection...');
        const socket = io(API_URL, {
            auth: { token },
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        socket.on('connect', () => {
            console.log('Socket connected successfully');
            socket.emit('join_chat', { chatId });
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setError('Failed to connect to chat server');
        });

        socket.on('message', (data) => {
            console.log('Received message:', data);
            setMessages(prev => [...prev, data.message]);
        });

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

        return () => {
            console.log('Cleaning up socket connection...');
            socket.emit('leave_chat', { chatId });
            socket.disconnect();
        };
    }, [chatId, userData, navigate]);

    // Fetch chat details
    useEffect(() => {
        const fetchChatDetails = async () => {
            if (!chatId) {
                console.log('No chatId provided');
                return;
            }

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                console.log('Fetching chat details for chatId:', chatId);
                const response = await axios.get(`${API_URL}/api/chats/${chatId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.success) {
                    setChatDetails(response.data.chat);
                    setMessages(response.data.chat.messages || []);
                } else {
                    setError('Failed to fetch chat details');
                }
            } catch (error) {
                console.error('Error fetching chat details:', error);
                setError(error.response?.data?.message || 'Failed to fetch chat details');
            }
        };

        fetchChatDetails();
    }, [chatId, navigate]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !chatId) return;

        const token = localStorage.getItem('token');
        if (!token) return;

        const socket = io(API_URL, {
            auth: { token }
        });

        socket.emit('sendMessage', {
            chatId,
            content: newMessage.trim()
        });

        setNewMessage('');
    };

    if (!chatId) {
        return <div className="error-message">No chat selected</div>;
    }

    return (
        <div className="chat-container">
            {error && <div className="error-message">{error}</div>}
            {chatDetails && (
                <div className="chat-header">
                    <h2>{chatDetails.participants.find(p => p._id !== userData?._id)?.username}</h2>
                </div>
            )}
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender._id === userData?._id ? 'sent' : 'received'}`}
                    >
                        <div className="message-content">{message.content}</div>
                        <div className="message-time">
                            {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatPage; 