import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Chat from './chat/Chat';
import ChatPage from './chat/ChatPage';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
function App() {

 
  const contacts = [
    {
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/000/435/728/small/1404.i033.096.S.m003.c10.Headphones_grunge.jpg',
      name: 'abv',
      status: 'online',
    },
    {
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/000/435/728/small/1404.i033.096.S.m003.c10.Headphones_grunge.jpg',
      name: 'sai',
      status: 'online',
    },
  
  ];

  const getContactByName = (name) => {
    return contacts.find((contact) => contact.name === name);
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/resetPassword/:token' element={<ResetPassword />} />
        <Route path="/chat" element={<Chat contacts={contacts} />} />
        <Route path="/chat/:name" element={<ChatPageWrapper getContactByName={getContactByName} />} />
      </Routes>
    </Router>
  );
}

const ChatPageWrapper = ({ getContactByName }) => {
  const { name } = useParams();
  const contact = getContactByName(name);

  return <ChatPage contact={contact} />;
};

export default App;
