/** @format */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import './chat.styles.scss';
import Button from '../../components/button/button.component';
import FormInput from '../../components/form-input/form-input.component';

const Chat = () => {
  const [aiSearch, setAiSearch] = useState('');
  const [aiResult, setAiResult] = useState('');

  const handleAiSearchChange = (event) => {
    event.preventDefault();
    setAiSearch(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setAiResult(resultData.message);
      console.log(aiResult);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to submit the form. Server response: ${errorText}`
        );
      }
    } catch (error) {
      console.log('Error submitting the form', error.message);
    }
  };

  return (
    <div className="chat">
      <nav className="sidebar">
        <ul className="side-nav">
          <li className="side-nav__item">
            <Link to="" className="side-nav__link">
              {<Plus className="side-nav__icon" />}
              <span>New Chat</span>
            </Link>
          </li>
        </ul>
        <div className="legal">
          &copy; 2023 by Bruno Vinícius. All rights reserved.
        </div>
      </nav>
      <div className="chat-content">
        <div className="chat-content__result">
          {aiResult && <p>{aiResult}</p>}
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
    </div>
  );
};

export default Chat;
