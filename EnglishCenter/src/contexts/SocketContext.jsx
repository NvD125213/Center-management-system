import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import PropTypes from "prop-types";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000"); // Địa chỉ server socket
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSocket = () => {
  return useContext(SocketContext);
};
