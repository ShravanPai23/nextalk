import { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "../statemanage/useConversation.js"; 

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages, selectedConversation } = useConversation(); 

  useEffect(() => {
    const getMessages = async () => {
      console.log("useGetMessages: selectedConversation changed to", selectedConversation);
      if (!selectedConversation?._id) {
        console.log("useGetMessages: No selected conversation, clearing messages.");
        setMessages([]); // Clears Zustand state
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `/message/get/${selectedConversation._id}`,
          { withCredentials: true }
        );
        console.log("useGetMessages: API response data:", res.data);
        setMessages(Array.isArray(res.data) ? res.data : []); 
      } catch (error) {
        console.error("❌ Error while fetching messages:", error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessages]);

  
  return { loading }; 
};

export default useGetMessages;