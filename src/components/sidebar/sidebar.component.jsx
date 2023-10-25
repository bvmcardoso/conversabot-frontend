/** @format */
import { ReactComponent as Plus } from '../../assets/plus.svg';
import Button from '../button/button.component';
import './sidebar.styles.scss';

const SideBar = ({ onNewChatClick }) => {
  return (
    <nav className="sidebar">
      <ul className="side-nav">
        <li className="side-nav__item">
          <Button buttonType="chat" onClick={onNewChatClick}>
            {<Plus className="side-nav__icon" />}
            <span>New Chat</span>
          </Button>
        </li>
      </ul>
      <div className="legal">
        &copy; 2023 by Bruno Vinícius. All rights reserved.
      </div>
    </nav>
  );
};

export default SideBar;
