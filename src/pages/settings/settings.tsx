import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './settings.scss';
import { switchThemes, alterTimeStamp, changeLanguage, useCtrlSubmit, changeUsername, resetToDefault, isMessageUnread, updateRoom, sendMessage, setRoom } from '../../store/actions/actions';
import io from 'socket.io-client';

let socket =  io.connect(`${process.env.SERVER}`);
interface SettingsPageProps{
    chat:{
        activeUser: string
    },
    room: {
        rooms: Array<{id: number, room: string, avatar: string, messages: any[]}>
    }
    settings: {
        theme: string,
        clock: string,
        ctrlEnterSubmit: string,
        language: string
    }
}

const SettingsPage : React.FunctionComponent = ()=>{
    const dispatch = useDispatch();
    const activeUser = useSelector((state: SettingsPageProps) => state.chat.activeUser);
    const currentTheme = useSelector((state: SettingsPageProps) => state.settings.theme);
    const currentTime = useSelector((state: SettingsPageProps) => state.settings.clock);
    const currentLanguage = useSelector((state: SettingsPageProps) => state.settings.language);
    const ctrlEnterSubmit = useSelector((state: SettingsPageProps) => state.settings.ctrlEnterSubmit);
    const theme = useSelector((state: SettingsPageProps) => state.settings.theme);
    const language = useSelector((state: SettingsPageProps) => state.settings.language);
    const rooms = useSelector((state: SettingsPageProps) => state.room.rooms);

    useEffect(()=>{
        console.log(rooms);
        socket.on('musicboard', ({name, message, date})=>{
            if(location.pathname === '/settings'){
                console.log('New message received');
                dispatch(isMessageUnread(true));
                dispatch(setRoom(Object.assign({}, rooms[0])));
                dispatch(sendMessage({name, message, date}));
                dispatch(updateRoom());
            }
        });
        //if(location.pathname === '/' && unreadMessage === true) alert('Read the message')
    }, []);

    return (
        <div className={`settings${theme === 'light' ? '': ' dark'}`}>
            <div className="settings__group">
                <p className="settings__title">{(language === 'luxembourgish') ? 'benotzernumm' : 'username'}</p>
                <input type="text" name="user" id="user" className={`settings__user${theme === 'light' ? '': ' dark'}`} autoComplete="off" value={activeUser} onChange={e => dispatch(changeUsername(e.target.value))}/>
            </div>
            <div className="settings__row">
                <div className="settings__group">
                    <p className="settings__title">{(language === 'luxembourgish') ? 'interface faarf' : 'interface color'}</p>
                    <div onChange={(e: any) => dispatch(switchThemes(e.target.value))}>
                        <div className="settings__check">
                            <label htmlFor="light" className="settings__check--label">{(language === 'luxembourgish') ? 'liicht' : 'light'}</label>
                            <input type="radio" name="color" id="light" value="light" className="settings__check--input" checked={currentTheme === 'light'}/>
                            <span className={`settings__check--indicator${theme === 'light' ? '': ' dark'}`}></span>
                        </div>
                        <div className="settings__check">
                            <label htmlFor="dark" className="settings__check--label">{(language === 'luxembourgish') ? 'däischter' : 'dark'}</label>
                            <input type="radio" name="color" id="dark" value="dark" className="settings__check--input" checked={currentTheme === 'dark'}/>
                            <span className={`settings__check--indicator${theme === 'light' ? '': ' dark'}`}></span>
                        </div>
                    </div>
                </div>
                <div className="settings__group">
                    <p className="settings__title">{(language === 'luxembourgish') ? 'auer affichage' : 'clock display'}</p>
                    <div onChange={(e: any) => dispatch(alterTimeStamp(e.target.value))}>
                        <div className="settings__check">
                            <label htmlFor="timestamp-12" className="settings__check--label">{(language === 'luxembourgish') ? '12 Stonnen' : '12 hours'}</label>
                            <input type="radio" name="timestamp" id="timestamp-12" value="12hour" className="settings__check--input" checked={currentTime === '12hour'}/>
                            <span className={`settings__check--indicator${theme === 'light' ? '': ' dark'}`}></span>
                        </div>
                        <div className="settings__check">
                            <label htmlFor="timestamp-24" className="settings__check--label">{(language === 'luxembourgish') ? '24 Stonnen' : '24 hours'}</label>
                            <input type="radio" name="timestamp" id="timestamp-24" value="24hour" className="settings__check--input" checked={currentTime === '24hour'}/>
                            <span className={`settings__check--indicator${theme === 'light' ? '': ' dark'}`}></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="settings__row">
                <div className="settings__group">
                    <p className="settings__title">{(language === 'luxembourgish') ? 'schéckt Messagen op' : 'send messages on'} CTRL+ENTER</p>
                    <div onChange={(e: any) => dispatch(useCtrlSubmit(e.target.value))}>
                        <div className="settings__check">
                            <label htmlFor="ctrlEnterSendOn" className="settings__check--label">{(language === 'luxembourgish') ? 'un' : 'on'}</label>
                            <input type="radio" name="ctrlEnterSend" id="ctrlEnterSendOn" value="on" className="settings__check--input" checked={ctrlEnterSubmit === 'on'}/>
                            <span className={`settings__check--indicator${theme === 'light' ? '': ' dark'}`}></span>
                        </div>
                        <div className="settings__check">
                            <label htmlFor="ctrlEnterSendOff" className="settings__check--label">{(language === 'luxembourgish') ? 'ofgeschalt' : 'off'}</label>
                            <input type="radio" name="ctrlEnterSend" id="ctrlEnterSendOff" value="off" className="settings__check--input" checked={ctrlEnterSubmit === 'off'}/>
                            <span className={`settings__check--indicator${theme === 'light' ? '': ' dark'}`}></span>
                        </div>
                    </div>
                </div>
                <div className="settings__group">
                    <p className="settings__title">{(language === 'luxembourgish') ? 'sprooch' : 'language'}</p>
                    <select name="lang" id="lang" className={`settings__lang${theme === 'light' ? '': ' dark'}`} value={currentLanguage} onChange={(e: any)=>dispatch(changeLanguage(e.target.value))}>
                        <option value="english">{(language === 'luxembourgish') ? 'Englesch' : 'English'}</option>
                        <option value="luxembourgish">{(language === 'luxembourgish') ? 'Lëtzebuergesch' : 'Luxembourgish'}</option>
                    </select>
                </div>
            </div>
            <a href="#" className={`settings__btn${theme === 'light' ? '': ' dark'}`} onClick={()=>dispatch(resetToDefault())}>{(language === 'luxembourgish') ? 'zréckgesat op Standard' : 'reset to default'}</a>
        </div>
    );
}

export default SettingsPage;