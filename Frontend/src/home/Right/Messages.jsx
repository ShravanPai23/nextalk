import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../context/useGetMessages.js";
import useGetSocketMessage from "../../context/useGetSocketMessage.jsx";
import useConversation from "../../statemanage/useConversation.js";
import Loading from "../../components/Loading.jsx";

function Messages() {
  const { loading } = useGetMessages();
  const { messages, selectedConversation } = useConversation();

  useGetSocketMessage();

  const lastMsgRef = useRef();

  console.log("Messages.jsx render:", {
    loading,
    messages,
    selectedConversation,
  });
  console.log("Messages.jsx: Is messages an array?", Array.isArray(messages));
  console.log("Messages.jsx: Messages length:", messages.length);

  useEffect(() => {
    console.log(
      "Messages.jsx useEffect: Messages state updated. Current length:",
      messages.length
    );
    if (Array.isArray(messages) && messages.length > 0) {
      setTimeout(() => {
        lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading && <Loading />}
      {!loading &&
        Array.isArray(messages) &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMsgRef : null}
          >
            <Message message={message} />
          </div>
        ))}
      {!loading && Array.isArray(messages) && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation (Current Conversation:{" "}
            {selectedConversation ? selectedConversation.name : "None"})
          </p>
        </div>
      )}
      {!loading && !Array.isArray(messages) && (
        <p className="text-center mt-[20%] text-red-500">
          Error: Messages data is corrupted! Debug: {JSON.stringify(messages)}
        </p>
      )}
    </div>
  );
}

export default Messages;
