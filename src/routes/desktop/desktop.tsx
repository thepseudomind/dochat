import React from 'react';
import Chatlist from '../../components/Chatlist/Chatlist';
import Navbar from '../../components/Navbar/Navbar';
import './desktop.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Switch, Route } from 'react-router-dom';
import SettingsPage from '../../pages/settings/settings';
import { useSelector } from 'react-redux';

interface DesktopProps{
    settings: {
        theme: string,
        language: string
    }
}

const RouterDesktop = () => {
    const theme = useSelector(((state : DesktopProps) => state.settings.theme));
    const language = useSelector(((state : DesktopProps) => state.settings.language));
    
    return (
        <div className={`route-desktop${theme === 'light' ? '': ' dark'}`}>
            <Switch>
                <Route exact path="/">
                    <div className="route-desktop__intro">
                        <h1>{(language === 'luxembourgish') ? 'Messagen' : 'Chats'}</h1>
                        <FontAwesomeIcon icon={faPlus}/>
                    </div>
                    <form className={`route-desktop__input${theme === 'light' ? '': ' dark'}`}>
                        <input type="text" name="search" id="search" placeholder={(language === 'luxembourgish') ? 'Sichen' : 'Search'} className={`route-desktop__input--textfield${theme === 'light' ? '': ' dark'}`} autoComplete="off"/>
                        <span className={`route-desktop__input--icon${theme === 'light' ? '': ' dark'}`}><FontAwesomeIcon icon={faSearch}/></span>
                    </form>
                    <Chatlist/>
                </Route>
                <Route path="/settings">
                    <div className="route-desktop__intro">
                        <h1>{(language === 'luxembourgish') ? 'Astellungen' : 'Settings'}</h1>
                    </div>
                    <SettingsPage/>
                </Route>
            </Switch>
            <Navbar/>
        </div>
    );
};

export default RouterDesktop;