/** @format */
import React, { useState, useEffect, useContext } from 'react';
import ChatContext from '../../contexts/chat.context';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './chat.styles.scss';
import Button from '../../components/button/button.component';
import FormInput from '../../components/form-input/form-input.component';
import SideBar from '../../components/sidebar/sidebar.component';

const Chat = () => {
  const location = useLocation();
  const [userInput, setUserInput] = useState('');
  const [aiResult, setAiResult] = useState({
    id: null,
    message: null,
    userInput: null,
    chatTitle: null,
  });
  const [showNewChatContent, setShowNewChatContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSingleLineResponse, setIsSingleLineResponse] = useState(true);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [currentChatSummary, setCurrentChatSummary] = useState(null);

  useEffect(() => {
    setShowNewChatContent(false);
  }, [location]);

  const replaceNewLinesWithBreaks = (text) => {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>');
  };

  const checkIsSingleLineResponse = (textResponse) => {
    if (textResponse.includes('\n')) {
      setIsSingleLineResponse(false);
    }
  };
  const clearUserInput = () => {
    setUserInput('');
  };

  const handleUserInputChange = (event) => {
    event.preventDefault();
    setUserInput(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = 'http://localhost:8080/api/chats/';

    try {
      const response = await axios.post(
        url,
        { userInput },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Backend exception:
      if (!response.data.success) {
        const apiErrorMessage = await response.data.message;
        checkIsSingleLineResponse(apiErrorMessage);

        setAiResult({
          message: apiErrorMessage,
          userInput: clearUserInput(),
        });

        return;
      }

      // Parse and set the AI result from the response
      const apiResponse = await response.data;
      checkIsSingleLineResponse(apiResponse.message);
      setAiResult({
        id: apiResponse.id,
        message: apiResponse.message,
        userInput: apiResponse.user_input,
        chatTitle: apiResponse.chat_title,
      });

      setCurrentChatId(apiResponse.id);
      setCurrentChatSummary(apiResponse.chat_title);
      console.log('currentChatId:' + currentChatId);
      console.log('currentChatSummary:' + currentChatSummary);

      clearUserInput();
    } catch (error) {
      console.log('Error submitting the form', error);
    } finally {
      setIsLoading(false);
    }
  };
    
  const handleNewChatClick = () => {
    setShowNewChatContent(true);
  };

  return (
    <>
      {isLoading && <div className="spinner">Please wait...</div>}
      <div className="chat">
        <SideBar
          onNewChatClick={handleNewChatClick}
          currentChatId={currentChatId}
          currentChatSummary={currentChatSummary}
        />
        {showNewChatContent ? (
          <div className="chat-content">
            <div className="chat-result">
              <div className="chat-result__question">
                <p>{aiResult.userInput}</p>
              </div>
              {aiResult.message && (
                <div className="chat-result__answer">
                  {!isSingleLineResponse ? (
                    <pre
                      dangerouslySetInnerHTML={{
                        __html: replaceNewLinesWithBreaks(aiResult.message),
                      }}
                    />
                  ) : (
                    replaceNewLinesWithBreaks(aiResult.message)
                  )}
                </div>
              )}
            </div>
            <div className="chat-search">
              <form onSubmit={handleSubmit} className="form-container">
                <FormInput
                  label=""
                  value={userInput}
                  onChange={handleUserInputChange}
                  placeholder="How can I help you today?"
                />
                <Button>Search</Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="chat-default">
            <h1>CHAT GPT</h1>
          </div>
          
        )}
      </div>
    </>
  );
};

export default Chat;
