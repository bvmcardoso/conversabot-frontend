/** @format */

import { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [showNewChatContent, setShowNewChatContent] = useState(false);
  const value = { showNewChatContent, setShowNewChatContent };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
