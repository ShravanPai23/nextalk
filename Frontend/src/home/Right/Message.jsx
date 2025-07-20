import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));

  const itsMe = message.senderId === authUser?.user?._id;

  const messageContainerClasses = itsMe
    ? "flex justify-end"
    : "flex justify-start";

  const messageBubbleColor = itsMe ? "bg-purple-700" : "bg-[#3d0e5c]";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`w-full px-4 mb-2 ${messageContainerClasses}`}>
      <div className="flex flex-col max-w-[70%]">
        <div
          className={`text-white px-4 py-2 rounded-lg break-words ${messageBubbleColor}`}
        >
          {message.message}
        </div>
        <div
          className={`text-xs text-gray-500 mt-1 ${
            itsMe ? "text-right" : "text-left"
          }`}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
}

export default Message;
