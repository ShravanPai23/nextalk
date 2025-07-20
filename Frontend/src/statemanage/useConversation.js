import { create } from "zustand";

const useConversation = create((set, get) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => {
    console.log("Zustand: setSelectedConversation", selectedConversation);
    set({ selectedConversation });
  },
  messages: [], 

 
  setMessages: (updater) => { 
    console.log("Zustand: setMessages called with updater:", updater); 
    set((state) => { 
      const newMessages = typeof updater === 'function' ? updater(state.messages) : updater;
      console.log("Zustand: Resulting new messages state:", newMessages); 
      return { messages: newMessages };
    });
  },
}));

export default useConversation;