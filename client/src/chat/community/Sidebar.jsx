import React from 'react';

const Sidebar = ({ users, onSelectUser, selectedUser }) => {
  return (
    <div className="w-full sm:w-1/3 md:w-1/4 bg-white border-r overflow-y-auto">
      <div className="p-4 font-bold text-xl border-b">Chats</div>
      {users.map((user, index) => (
        <div
          key={index}
          onClick={() => onSelectUser(user)}
          className={`p-4 cursor-pointer hover:bg-gray-100 border-b ${
            selectedUser?.name === user.name ? "bg-gray-200" : ""
          }`}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
