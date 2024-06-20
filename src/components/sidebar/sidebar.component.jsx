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
  const { setCurrentOpenedChat, currentOpenedChat } = useContext(ChatContext);

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
      console.log(updatedChat.messages);
      console.log('typeof(updatedChat.messages)', typeof updatedChat.messages);
    }
  };

  //   When the component is mounted we get all existing chats.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get('chats/');

        setExistingChats(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err.message);
        }
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
