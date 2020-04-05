import React from 'react';
import './settings.scss';
import { useSelector, useDispatch } from 'react-redux';
import { switchThemes, alterTimeStamp, changeLanguage, useCtrlSubmit, changeUsername, resetToDefault } from '../../store/actions/actions';

interface SettingsPageProps{
    chat:{
        activeUser: string
    },
    settings: {
        theme: string,
        clock: string,
        ctrlEnterSubmit: string,
        language: string
    }
}

const SettingsPageMobile : React.FunctionComponent = ()=>{
    const dispatch = useDispatch();
    const activeUser = useSelector((state: SettingsPageProps) => state.chat.activeUser);
    const currentTheme = useSelector((state: SettingsPageProps) => state.settings.theme);
    const currentTime = useSelector((state: SettingsPageProps) => state.settings.clock);
    const currentLanguage = useSelector((state: SettingsPageProps) => state.settings.language);
    const ctrlEnterSubmit = useSelector((state: SettingsPageProps) => state.settings.ctrlEnterSubmit);
    const theme = useSelector((state: SettingsPageProps) => state.settings.theme);
    const language = useSelector((state: SettingsPageProps) => state.settings.language);

    return (
        <div className={`settings-mobile${theme === 'light' ? '': ' dark'}`}>
            <div className="settings-mobile__group">
                <p className="settings-mobile__title">{(language === 'luxembourgish') ? 'benotzernumm' : 'username'}</p>
                <input type="text" name="userMobile" id="userMobile" className={`settings-mobile__input${theme === 'light' ? '': ' dark'}`} autoComplete="off" defaultValue={activeUser} onChange={e => dispatch(changeUsername(e.target.value))}/>
            </div>
            <div className="settings-mobile__group">
                <p className="settings-mobile__title">{(language === 'luxembourgish') ? 'interface faarf' : 'interface color'}</p>
                <div onChange={(e: any) => dispatch(switchThemes(e.target.value))}>
                    <div className="settings-mobile__check">
                        <label htmlFor="light-mobile" className="settings-mobile__check--label">{(language === 'luxembourgish') ? 'liicht' : 'light'}</label>
                        <input type="radio" name="color-mobile" id="light-mobile" value="light" className="settings-mobile__check--input" checked={currentTheme === 'light'}/>
                        <span className={`settings-mobile__check--indicator${theme === 'light' ? '': ' dark'}`}></span>
                    </div>
                    <div className="settings-mobile__check">
                        <label htmlFor="dark-mobile" className="settings-mobile__check--label">{(language === 'luxembourgish') ? 'däischter' : 'dark'}</label>
                        <input type="radio" name="color-mobile" id="dark-mobile" value="dark" className="settings-mobile__check--input" checked={currentTheme === 'dark'}/>
                        <span className={`settings-mobile__check--indicator${theme === 'light' ? '': ' dark'}`}></span>
                    </div>
                </div>
            </div>
            <div className="settings-mobile__group">
                <p className="settings-mobile__title">{(language === 'luxembourgish') ? 'auer affichage' : 'clock display'}</p>
                <div onChange={(e: any) => dispatch(alterTimeStamp(e.target.value))}>
                    <div className="settings-mobile__check">
                        <label htmlFor="timestamp-mobile-12" className="settings-mobile__check--label">{(language === 'luxembourgish') ? '12 Stonnen' : '12 hours'}</label>
                        <input type="radio" name="timestamp-mobile" id="timestamp-mobile-12" value="12hour" className="settings-mobile__check--input" checked={currentTime === '12hour'}/>
                        <span className={`settings-mobile__check--indicator${theme === 'light' ? '': ' dark'}`}></span>
                    </div>
                    <div className="settings-mobile__check">
                        <label htmlFor="timestamp-mobile-24" className="settings-mobile__check--label">{(language === 'luxembourgish') ? '24 Stonnen' : '24 hours'}</label>
                        <input type="radio" name="timestamp-mobile" id="timestamp-mobile-24" value="24hour" className="settings-mobile__check--input" checked={currentTime === '24hour'}/>
                        <span className={`settings-mobile__check--indicator${theme === 'light' ? '': ' dark'}`}></span>
                    </div>
                </div>
            </div>
            <div className="settings-mobile__group">
                <p className="settings-mobile__title">{(language === 'luxembourgish') ? 'schéckt Messagen op' : 'send messages on'} CTRL+ENTER</p>
                <div onChange={(e: any) => dispatch(useCtrlSubmit(e.target.value))}>
                    <div className="settings-mobile__check">
                        <label htmlFor="ctrlEnterSendMobileOn" className="settings-mobile__check--label">{(language === 'luxembourgish') ? 'un' : 'on'}</label>
                        <input type="radio" name="ctrlEnterSendMobile" id="ctrlEnterSendMobileOn" value="on" className="settings-mobile__check--input" checked={ctrlEnterSubmit === 'on'}/>
                        <span className={`settings-mobile__check--indicator${theme === 'light' ? '': ' dark'}`}></span>
                    </div>
                    <div className="settings-mobile__check">
                        <label htmlFor="ctrlEnterSendMobileOff" className="settings-mobile__check--label">{(language === 'luxembourgish') ? 'ofgeschalt' : 'off'}</label>
                        <input type="radio" name="ctrlEnterSendMobile" id="ctrlEnterSendMobileOff" value="off" className="settings-mobile__check--input" checked={ctrlEnterSubmit === 'off'}/>
                        <span className={`settings-mobile__check--indicator${theme === 'light' ? '': ' dark'}`}></span>
                    </div>
                </div>
            </div>
            <div className="settings-mobile__group">
                <p className="settings-mobile__title">{(language === 'luxembourgish') ? 'sprooch' : 'language'}</p>
                <select name="lang-mobile" id="lang-mobile" className={`settings-mobile__lang${theme === 'light' ? '': ' dark'}`} value={currentLanguage} onChange={(e: any)=>dispatch(changeLanguage(e.target.value))}>
                    <option value="english">{(language === 'luxembourgish') ? 'Englesch' : 'English'}</option>
                    <option value="luxembourgish">{(language === 'luxembourgish') ? 'Lëtzebuergesch' : 'Luxembourgish'}</option>
                </select>
            </div>
            <div className="settings-mobile__group">
                <a href="#" className={`settings-mobile__reset${theme === 'light' ? '': ' dark'}`} onClick={()=>dispatch(resetToDefault())}>{(language === 'luxembourgish') ? 'zréckgesat op Standard' : 'reset to default'}</a>
            </div>
        </div>
    );
}

export default SettingsPageMobile;