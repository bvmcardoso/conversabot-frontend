/** @format */
import { ReactComponent as PlusSvg } from '../../assets/plus.svg';
import { ReactComponent as ConversationSvg } from '../../assets/conversation-svgrepo-com.svg';
import { useState, useEffect, useContext } from 'react';
import Button from '../button/button.component';
import './sidebar.styles.scss';
import axios from 'axios';
import { ChatContext } from '../../contexts/chat.context';
import { Link } from 'react-router-dom';

const SideBar = ({ onNewChatClick, currentChatId, currentChatSummary }) => {
  const [existingChats, setExistingChats] = useState([]);
  const { setCurrentOpenedChat, currentOpenedChat } = useContext(ChatContext);

  const handleChatClick = async (chatId) => {
    const url = 'http://localhost:8080/api/chats/';
    const response = await axios.get(`${url}${chatId}`);
    if (response.data) {
      const updatedChat = {
        id: response.data.id,
        title: response.data.title,
        messages: response.data.messages,
      };
      setCurrentOpenedChat(updatedChat);
      console.log({ currentOpenedChat });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/chats/');
        console.log(response.data);
        setExistingChats(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <nav className="sidebar">
      <ul className="side-nav">
        <li className="side-nav__item">
          <Button buttonType="new" onClick={onNewChatClick}>
            {<PlusSvg className="side-nav__icon" />}
            <span>New Chat</span>
          </Button>
        </li>
        {currentChatSummary && (
          <li className="side-nav__existing-chat">
            {<ConversationSvg className="side-nav__icon-big" />}
            <Link onClick={() => handleChatClick(currentChatId)}>
              {currentChatSummary}
            </Link>
          </li>
        )}
        {existingChats.map((chat) => (
          <li className="side-nav__existing-chat">
            {<ConversationSvg className="side-nav__icon-big" />}
            <Link onClick={() => handleChatClick(chat.id)}>{chat.title}</Link>
          </li>
        ))}
      </ul>
      <div className="legal">&copy; by Bruno Vinícius</div>
    </nav>
  );
};

export default SideBar;
