/** @format */
import { ReactComponent as PlusSvg } from '../../assets/plus.svg';
import { ReactComponent as ConversationSvg } from '../../assets/conversation-svgrepo-com.svg';
import { useEffect, useContext } from 'react';
import Button from '../button/button.component';
import './sidebar.styles.scss';
import { ChatContext } from '../../contexts/chat.context';
import { Link } from 'react-router-dom';
import apiService from '../../api/apiService';

const SideBar = ({ onNewChatClick }) => {
  const { existingChats, setExistingChats } = useContext(ChatContext);
  const { setCurrentOpenedChat } = useContext(ChatContext);

  const handleExistingChatClick = async (chatId) => {
    const url = 'chats/';

    const response = await apiService.get(`${url}${chatId}`);

    if (response.data) {
      const updatedChat = {
        id: response.data.id,
        title: response.data.title,
        messages: response.data.messages,
      };
      setCurrentOpenedChat(updatedChat);
    }
  };

  //   When the component is mounted we get all existing chats.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get('chats/');
        setExistingChats((previousChats) => response.data);
      } catch (error) {
        if (error.response) {
          throw new Error(
            'Response error fetching the existing chats.' + error.response
          );
        } else if (error.request) {
          throw new Error(
            'Request error fetching the existing chats.' + error.request
          );
        } else {
          throw new Error(
            'Generic error fetching the existing chats.' + error.message
          );
        }
      }
    };
    fetchData();
  }, [setExistingChats]);

  return (
    <nav className="sidebar">
      <ul className="side-nav">
        <li className="side-nav__item">
          <Button buttonType="new" onClick={onNewChatClick}>
            {<PlusSvg className="side-nav__icon" />}
            <span>New Chat</span>
          </Button>
        </li>
        {existingChats.map((chat) => (
          <li
            key={chat.id}
            className="side-nav__existing-chat"
            onClick={() => handleExistingChatClick(chat.id)}
          >
            {<ConversationSvg className="side-nav__icon-big" />}
            <Link>{chat.title}</Link>
          </li>
        ))}
      </ul>
      <div className="legal">&copy; by Bruno Vinícius</div>
    </nav>
  );
};

export default SideBar;
