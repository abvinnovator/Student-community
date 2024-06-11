// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Chat from './chat/Chat';
import ChatPage from './chat/ChatPage';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import MyProfile from './chat/MyProfile';
import Posts from './chat/Posts';
import UserProfile from './chat/UserProfile';
import GridPattern from './GridPattern';
import GetPost from './Posts/GetPost';
import Groups from './chat/community/Groups';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:username" element={<ChatPageWrapper />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route path="/posts" element={<Posts />} />
        <Route path='/getposts' element={<GetPost />} />
        
        <Route path='/groups' element={<Groups />} />
        <Route path='/grid' element={<GridPattern />} />
      </Routes>
    </Router>
  );
};

const ChatPageWrapper = () => {
  const { username } = useParams();
  return <ChatPage username={username} />;
};

export default App;
