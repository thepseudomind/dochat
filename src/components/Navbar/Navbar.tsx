import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faComments, faUser } from '@fortawesome/free-regular-svg-icons';
import './Navbar.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { isMessageUnread } from '../../store/actions/actions';
import io from 'socket.io-client';

let socket =  io.connect(`${process.env.SERVER}`);

interface NavbarProps{
    settings: {
        theme: string
    },
    room: {
        unreadMessage: boolean
    }
}

const Navbar: React.FunctionComponent = ()=>{
    const theme = useSelector(((state : NavbarProps) => state.settings.theme));
    const unreadMessage = useSelector(((state : NavbarProps) => state.room.unreadMessage));


    return (
        <nav className={`navbar${theme === 'light' ? '': ' dark'}`}>
            <ul className="navbar__menu">
                <li className="navbar__menu--items">
                    <NavLink exact to="/" activeClassName={`navbar__menu--items--link active${theme === 'light' ? '': ' dark'}`} className={`navbar__menu--items--link${theme === 'light' ? '': ' dark'}`}><FontAwesomeIcon icon={faComments}/></NavLink>
                    {unreadMessage ? <span className={`navbar__menu--indicator${theme === 'light' ? '': ' dark'}`}>1</span> : null}
                </li>
                <li className="navbar__menu--items">
                    <NavLink to="/settings" activeClassName={`navbar__menu--items--link active${theme === 'light' ? '': ' dark'}`} className={`navbar__menu--items--link${theme === 'light' ? '': ' dark'}`}><FontAwesomeIcon icon={faCog}/></NavLink>
                </li>
                <li className="navbar__menu--items">
                    <a href="#" className={`navbar__menu--items--link${theme === 'light' ? '': ' dark'}`}><FontAwesomeIcon icon={faUser}/></a>
                </li>
                <li className="navbar__menu--items">
                    <a href="#" className={`navbar__menu--items--link${theme === 'light' ? '': ' dark'}`}><FontAwesomeIcon icon={faSignOutAlt}/></a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;