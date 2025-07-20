import { useState } from 'react';
import axios from 'axios';
import useConversation from '../statemanage/useConversation';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation(); 

  const sendMessage = async (messageText) => {
    if (!selectedConversation) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `/message/send/${selectedConversation._id}`,
        { message: messageText },
        { withCredentials: true }
      );
      const data = res.data.data; 

      if (res.data.error) throw new Error(res.data.error);


      setMessages((prevMessages) => [...prevMessages, data]);

      console.log("Message sent successfully:", data);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;