import React from "react";
import useConversation from "../../statemanage/useConversation";

const User = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;

  const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
    user.name
  )}`;

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center space-x-4 px-2 py-4 rounded-lg cursor-pointer ">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={avatarUrl}
            alt={`${user.name}'s avatar`}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-white font-semibold text-lg">{user.name}</h1>
          <span className="text-gray-400 text-sm">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
