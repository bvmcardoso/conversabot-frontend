/** @format */

import { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [showNewChatContent, setShowNewChatContent] = useState(false);
  const [existingChats, setExistingChats] = useState([]);
  const [aiResult, setAiResult] = useState({
    id: null,
    message: null,
    userInput: null,
    chatTitle: null,
  });
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
    existingChats,
    setExistingChats,
    aiResult,
    setAiResult,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
