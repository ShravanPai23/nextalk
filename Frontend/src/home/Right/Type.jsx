import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../context/useSendMessage.js";

const Type = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 bg-gray-800 h-[8vh] px-4 flex items-center space-x-3 z-10"
    >
      <input
        type="text"
        placeholder="Type here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 bg-gray-700 text-white rounded px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="text-white hover:text-red-400"
      >
        <IoMdSend size={24} />
      </button>
    </form>
  );
};

export default Type;
