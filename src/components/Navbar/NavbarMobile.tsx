import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';
import { switchChatMode, setRoom, updateRoom, isMessageUnread, sendMessage, fetchDummyRooms } from '../../store/actions/actions';

interface NavbarProps {
    room: {
        chatting: boolean,
        activeRoom: {id: number, room: string, avatar: string, messages: any[]},
        unreadMessage : boolean 
    },
    settings: {
        theme: string,
        language: string
    }
}

const NavbarMobile : React.FunctionComponent = ()=> {
    const dispatch = useDispatch();
    const chatting = useSelector((state: NavbarProps) => state.room.chatting);
    const roomName = useSelector((state: NavbarProps) => state.room.activeRoom.room);
    const theme = useSelector(((state : NavbarProps) => state.settings.theme));
    const language = useSelector(((state : NavbarProps) => state.settings.language));
    const unreadMessage = useSelector((state: NavbarProps) => state.room.unreadMessage);

    return (
        <nav className={`navbar-mobile${theme === 'light' ? '': ' dark'}`}>
            <div className="navbar-mobile__top">
                {chatting ? <FontAwesomeIcon icon={faTimes} className="navbar-mobile__top--icon" onClick={()=>{
                    dispatch(switchChatMode(false));
                    dispatch(updateRoom());
                }}/> : <span></span>}
                {chatting ? <span></span> : <FontAwesomeIcon icon={faPlus} className="navbar-mobile__top--icon"/>}
            </div>
            {
                chatting ? <div className="navbar-mobile__bottom"><span className="navbar-mobile__bottom--title">{roomName}</span></div> :
                <div className="navbar-mobile__bottom">
                    <NavLink exact to="/" activeClassName={`navbar-mobile__bottom--link active${theme === 'light' ? '': ' dark'}`} className={`navbar-mobile__bottom--link${theme === 'light' ? '': ' dark'}`}>{(language === 'luxembourgish') ? 'Messagen' : 'Chats'}{unreadMessage ? <span className={`navbar-mobile__bottom--indicator${theme === 'light' ? '': ' dark'}`}>1</span> : null}</NavLink>
                    <NavLink to="/settings" activeClassName={`navbar-mobile__bottom--link active${theme === 'light' ? '': ' dark'}`} className={`navbar-mobile__bottom--link${theme === 'light' ? '': ' dark'}`}>{(language === 'luxembourgish') ? 'Astellungen' : 'Settings'}</NavLink>
                    <a href="#" className={`navbar-mobile__bottom--link${theme === 'light' ? '': ' dark'}`}>{(language === 'luxembourgish') ? 'Profil' : 'Profile'}</a>
                </div>
            }
        </nav>
    );
};

export default NavbarMobile;