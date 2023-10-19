/** @format */
import { Link } from 'react-router-dom';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import './chat.styles.scss';
const Chat = () => {
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
      <div className="chat-content">side 2</div>
    </div>
  );
};

export default Chat;
