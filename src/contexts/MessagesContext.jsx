import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const MessagesContext = createContext();

const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState("");
  useEffect(() => {
    if (messages) {
      toast.error(messages, {
        position: "top-right",
        autoClose: 2000,
      });
      setMessages("");
    }
  }, [messages]);
  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

MessagesProvider.propTypes = {
  children: PropTypes.node,
};

export { MessagesContext, MessagesProvider };
