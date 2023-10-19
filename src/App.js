/** @format */
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Chat from './routes/chat/chat.component';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>
  );
};

export default App;
