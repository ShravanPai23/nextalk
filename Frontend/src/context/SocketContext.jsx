import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { authUser } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (authUser && !socketRef.current) {
      console.log("Attempting to connect socket for user:", authUser.user._id);

      const socketInstance = io("http://localhost:5000", {
        query: {
          userId: authUser.user._id,
        },
        withCredentials: true,
      });

      socketRef.current = socketInstance;
      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users) => {
        console.log("Received online users:", users);
        setOnlineUsers(users);
      });

      socketInstance.on("connect", () => {
        console.log("Socket connected:", socketInstance.id);
      });

      socketInstance.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        setOnlineUsers([]);
      });

      socketInstance.on("connect_error", (err) => {
        console.error("Socket.IO Connection Error:", err.message);
        if (socketInstance) {
          socketInstance.disconnect();
        }
      });
    }

    return () => {
      if (socketRef.current && authUser === null) {
        console.log("Disconnecting socket in cleanup due to logout/unmount.");
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
        setOnlineUsers([]);
      }
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
