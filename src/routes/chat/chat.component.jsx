/** @format */
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { ChatContext } from '../../contexts/chat.context';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './chat.styles.scss';
import Button from '../../components/button/button.component';
import FormInput from '../../components/form-input/form-input.component';
import SideBar from '../../components/sidebar/sidebar.component';
import logo from '../../assets/brncodex_logo.png';
import HtmlContent from '../../components/htmlContent/htmlContent.component';

const Chat = () => {
  const location = useLocation();
  const [userInput, setUserInput] = useState('');
  const [showNewChatContent, setShowNewChatContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSingleLineResponse, setIsSingleLineResponse] = useState(true);
  const { currentOpenedChat, setCurrentOpenedChat } = useContext(ChatContext);
  const { setExistingChats } = useContext(ChatContext);
  const { aiResult, setAiResult } = useContext(ChatContext);

  useEffect(() => {
    setShowNewChatContent(false);
  }, [location]);

  useEffect(() => {
    //   Fetch existing chats when currentOpenedChat is updated
    const fetchExistingChats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/chats/');
        setExistingChats(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchExistingChats();
  }, [currentOpenedChat]);

  const clearUserInput = () => {
    setUserInput('');
  };

  const handleUserInputChange = (event) => {
    event.preventDefault();
    setUserInput(event.target.value);
  };

  const handleNewChatClick = () => {
    setShowNewChatContent(true);
    setCurrentOpenedChat({ id: null, title: null, messages: [] });
    setAiResult({ id: null, message: null, userInput: null, chatTitle: null });
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
        setShowNewChatContent(false);
        setAiResult({
          message: apiErrorMessage,
          userInput: clearUserInput(),
        });

        return;
      }

      // Parse and set the AI result from the response
      const apiResponse = await response.data;
      setAiResult({
        id: apiResponse.id,
        message: apiResponse.message,
        userInput: apiResponse.user_input,
        chatTitle: apiResponse.chat_title,
      });
      setCurrentOpenedChat({
        id: null,
      });
      setShowNewChatContent(false);
      clearUserInput();
    } catch (error) {
      console.log('Error submitting the form', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      {isLoading && (
        <div className="spinner">
          <div className="spinner__message">
            <span>Please wait</span>
          </div>
          <div className="spinner__picture">
            <img src={logo} alt="Logo" className="spinner__logo" />
          </div>
        </div>
      )}
      <div className="chat">
        {/* Sets the behavior of the prop "onNewChatClick" with the content of the function */}
        <SideBar onNewChatClick={handleNewChatClick} />
        {showNewChatContent && (
          <div className="chat-content">
            <div></div>
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
        )}
        {/* Result that comes from the Search button */}
        {aiResult.message && (
          <div className="chat-content">
            <div className="chat-result">
              <div className="chat-result__question">
                <p>{aiResult.userInput}</p>
              </div>
              {aiResult.message && (
                <div className="chat-result__answer">
                  <HtmlContent htmlString={aiResult.message} />
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
        )}
        {/* Existing chats when clicked */}
        {currentOpenedChat.id && (
          <div className="chat-content">
            {currentOpenedChat.messages.map((existingChat) => (
              <div className="chat-result">
                <div className="chat-result__question">
                  <p>{existingChat.user_input}</p>
                </div>
                <div className="chat-result__answer">
                  <HtmlContent htmlString={existingChat.message} />
                </div>
              </div>
            ))}
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
        )}
      </div>
    </Fragment>
  );
};

export default Chat;
