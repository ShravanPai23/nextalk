import { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../statemanage/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation();

  useEffect(() => {
    if (!socket) {
      console.log("useGetSocketMessage: Socket not available.");
      return;
    }

    const handleNewMessage = (newMessage) => {
      console.log(
        "useGetSocketMessage: Received newMessage from socket:",
        newMessage
      );
      const notification = new Audio(sound);
      notification.play();

      setMessages((prevMessages) => {
        console.log(
          "useGetSocketMessage: Updating messages from",
          prevMessages,
          "with",
          newMessage
        );
        return [...prevMessages, newMessage];
      });
    };

    socket.on("newMessage", handleNewMessage);
    console.log("useGetSocketMessage: Subscribed to newMessage event.");

    return () => {
      socket.off("newMessage", handleNewMessage);
      console.log("useGetSocketMessage: Unsubscribed from newMessage event.");
    };
  }, [socket, setMessages]);
};

export default useGetSocketMessage;
