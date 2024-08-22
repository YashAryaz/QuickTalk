import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [incomingCall, setIncomingCall] = useState(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io(
        "https://quicktalk-b0rb.onrender.com/",
        {
          query: {
            userId: authUser._id,
          },
        },
      );

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      socket.on("callUser", (data) => {
        setIncomingCall({
          from: data.from,
          signal: data.signal,
          name: data.name,
        });
      });

      socket.on("callAccepted", (signal) => {
        // Handle the accepted call here
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, incomingCall }}>
      {children}
    </SocketContext.Provider>
  );
};
