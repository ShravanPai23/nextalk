import React from "react";
import ChatUser from "./ChatUser";
import Messages from "./Messages";
import Type from "./Type";

const Right = () => {
  return (
    <div className="right-container w-[71%] h-screen bg-gray-850 text-white flex flex-col">
      <div className="h-[8vh]">
        <ChatUser />
      </div>

      <div className="flex-1 relative">
        <div className="absolute top-[8vh] bottom-[8vh] left-0 right-0 overflow-y-auto px-4 pt-4 scrollbar-hide">
          <Messages />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[8vh]">
          <Type />
        </div>
      </div>
    </div>
  );
};

export default Right;
