/** @format */
import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext, useState } from 'react';
import { ReactComponent as Logo } from '../../assets/foxbox.svg';
import React from 'react';
import './navigation.styles.scss';

const Navigation = () => {
  return (
    <Fragment>
      <div className="user-nav">
        <Link className="user-nav__icon-box" to="/">
          <div className="user-nav__icon">{<Logo className="logo" />}</div>
        </Link>
        <div className="user-nav__link">
          <Link className="nav-link">Chat</Link>
          <Link className="nav-link">Youtube Summarizer</Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
