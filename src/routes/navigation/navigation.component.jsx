/** @format */
import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as Logo } from '../../assets/foxbox.svg';
import { ChatContext } from '../../contexts/chat.context';

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
        <Link className="user-nav__icon-box" to="/">
          <div className="user-nav__icon">{<Logo className="logo" />}</div>
        </Link>
        <div className="user-nav__link">
          <Link className="nav-link" to="/chat" onClick={handleChatClick}>
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
