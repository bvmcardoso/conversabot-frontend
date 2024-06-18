/** @format */
import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ChatContext } from '../../contexts/chat.context';
import { ReactComponent as Logo } from '../../assets/brncodex_logo.svg';

import React from 'react';
import './navigation.styles.scss';

const Navigation = () => {
  const { showNewChatContent, setShowNewChatContent } = useContext(ChatContext);
  const handleChatClick = () => {
    setShowNewChatContent(false);
  };

  return (
    <Fragment>
      <div className="user-nav">
        <Link to="/">
          <div className="user-nav__icon">{<Logo className="logo" />}</div>
        </Link>
        <div className="user-nav__link">
          <Link to="/chat" onClick={handleChatClick}>
            Chat
          </Link>
          {/* <Link className="nav-link">Youtube Summarizer</Link> */}
        </div>
      </div>
      <Outlet className="outlet" />
    </Fragment>
  );
};

export default Navigation;
