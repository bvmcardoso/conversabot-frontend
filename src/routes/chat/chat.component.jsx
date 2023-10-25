/** @format */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './chat.styles.scss';
import Button from '../../components/button/button.component';
import FormInput from '../../components/form-input/form-input.component';
import SideBar from '../../components/sidebar/sidebar.component';
import ProjectEstimator from '../../components/project-estimator/project-estimator.component';
const Chat = () => {
  const location = useLocation();
  const [aiSearch, setAiSearch] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [showNewChatContent, setShowNewChatContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const replaceNewLinesWithBreaks = (text) => {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>');
  };

  useEffect(() => {
    setShowNewChatContent(false);
  }, [location]);

  const handleAiSearchChange = (event) => {
    event.preventDefault();
    setAiSearch(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = 'http://localhost:8080/api/chats/';
    // Make a post to the backend:

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aiSearch }),
      });

      //   Parse and set the AI result from the response
      const resultData = await response.json();
      const parsed_response = resultData.message;
      console.log(parsed_response);
      setAiResult(parsed_response);
      setAiSearch('');

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to submit the form. Server response: ${errorText}`
        );
      }
    } catch (error) {
      console.log('Error submitting the form', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChatClick = () => {
    setShowNewChatContent(true);
  };

  return (
    <>
      {isLoading && <div class="spinner">Please wait...</div>}
      <div className="chat">
        <SideBar onNewChatClick={handleNewChatClick} />
        {showNewChatContent ? (
          <div className="chat-content">
            <div className="chat-content__result">
              {aiResult && (
                <pre
                  dangerouslySetInnerHTML={{
                    __html: replaceNewLinesWithBreaks(aiResult),
                  }}
                />
              )}
              {/* {aiResult && <ProjectEstimator formattedData={aiResult} />} */}
            </div>
            <div className="chat-content__search">
              <form onSubmit={handleSubmit} className="form-container">
                <FormInput
                  label="ChatGPT Search"
                  value={aiSearch}
                  onChange={handleAiSearchChange}
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
