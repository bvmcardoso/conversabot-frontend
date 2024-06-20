/** @format */
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { ChatContext } from '../../contexts/chat.context';
import { useLocation } from 'react-router-dom';
import './chat.styles.scss';
import Button from '../../components/button/button.component';
import FormInput from '../../components/form-input/form-input.component';
import SideBar from '../../components/sidebar/sidebar.component';
import logo from '../../assets/brncodex_logo.png';
import HtmlContent from '../../components/htmlContent/htmlContent.component';
import apiService from '../../api/apiService';

const Chat = () => {
  const location = useLocation();
  const [userInput, setUserInput] = useState('');
  const [showNewChatContent, setShowNewChatContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        console.log(apiService.url);
        const response = await apiService.get('chats/');
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = 'chats/';

    try {
      let previous_messages = [];
      for (let answer of currentOpenedChat.messages) {
        previous_messages.push(answer.message);
      }
      const chat_information = {
        userInput: userInput,
        chat_id: currentOpenedChat.id,
        previous_answers: previous_messages,
      };

      const gpt_response = await apiService.post(url, chat_information);

      //   Backend exception:
      if (!gpt_response.data.success) {
        const apiErrorMessage = await gpt_response.data.message;
        setShowNewChatContent(false);
        setAiResult({
          message: apiErrorMessage,
          userInput: clearUserInput(),
        });

        return;
      }
      const chat_id = gpt_response.data.id;
      const chat_record = await apiService.get(`${url}${chat_id}`);

      if (chat_record.data) {
        const updatedChat = {
          id: chat_record.data.id,
          title: chat_record.data.title,
          message: gpt_response.data.message,
          messages: chat_record.data.messages,
          userInput: userInput,
        };
        setShowNewChatContent(false);
        setCurrentOpenedChat(updatedChat);

        clearUserInput();
      }
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
        {currentOpenedChat.id && (
          <div className="chat-content">
            {currentOpenedChat.messages
              ?.map((existingChat, index) => (
                <div className="chat-result" key={index}>
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
