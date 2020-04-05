import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector} from 'react-redux';
import ChatlistMobile from '../../components/Chatlist/ChatlistMobile';
import ChatPageMobile from '../../pages/chat/chatMobile';
import SettingsPageMobile from '../../pages/settings/settingsMobile';

const RouterMobile : React.FunctionComponent = ()=>{
    interface MockState{
        room: {
            chatting: boolean
        }
    }

    const isChatting = useSelector((state: MockState) => state.room.chatting);

    return (
        <Switch>
            <Route exact path="/">
                {isChatting ? <ChatPageMobile/> : null}
                {isChatting ? null : <ChatlistMobile/>}
            </Route>
            <Route path="/settings">
                <SettingsPageMobile/>
            </Route>
        </Switch>
    );
};

export default RouterMobile;