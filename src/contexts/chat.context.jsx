/** @format */

import { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [showNewChatContent, setShowNewChatContent] = useState(false);
  const [existingChats, setExistingChats] = useState([]);
  const [currentOpenedChat, setCurrentOpenedChat] = useState({
    id: null,
    title: null,
    message: null,
    userInput: null,
    messages: [],
  });
  const value = {
    showNewChatContent,
    setShowNewChatContent,
    currentOpenedChat,
    setCurrentOpenedChat,
    existingChats,
    setExistingChats,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
