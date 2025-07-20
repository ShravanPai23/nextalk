import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  if (!selectedConversation) {
    return (
      <div className="pl-5 pt-3 h-[10vh] flex items-center justify-center bg-gray-800 text-white text-lg">
        Select a chat to start messaging
      </div>
    );
  }

  const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
    selectedConversation.name
  )}`;

  const isOnline = onlineUsers.includes(selectedConversation._id);

  return (
    <div className="pl-5 pt-3 h-[12vh] flex items-center space-x-4 bg-gray-800 hover:bg-gray-600 duration-300">
      <div>
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={avatarUrl}
            alt={`${selectedConversation.name}'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div>
        <h1 className="text-white text-md font-semibold">
          {selectedConversation.name}
        </h1>
        <span
          className={`text-sm ${isOnline ? "text-green-400" : "text-gray-400"}`}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;
