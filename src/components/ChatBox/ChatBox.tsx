import React from 'react';
import { useLocation } from 'react-router-dom';
import './ChatBox.scss';
import ChatPage from '../../pages/chat/chat';
import { useSelector } from 'react-redux';

interface ChatBoxProps {
    settings: {
        theme: string
    }
}

const ChatBox : React.FunctionComponent = ()=> {
    const location = useLocation();
    const theme = useSelector((state: ChatBoxProps) => state.settings.theme);

    { return (location.pathname === '/') ? <div className={`desktop${theme === 'light' ? '': ' dark'}`}><ChatPage/></div> : null}
};

export default ChatBox;
