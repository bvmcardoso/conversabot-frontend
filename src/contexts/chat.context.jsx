/** @format */

import { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [showNewChatContent, setShowNewChatContent] = useState(false);
  const [currentOpenedChat, setCurrentOpenedChat] = useState({
    id: null,
    title: null,
    messages: [],
  });
  const value = {
    showNewChatContent,
    setShowNewChatContent,
    currentOpenedChat,
    setCurrentOpenedChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
