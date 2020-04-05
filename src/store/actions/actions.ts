import { ROOMS_FAILED, ROOMS_LOADED, ROOMS_LOADING, CHANGE_USERNAME, IS_CHATTING, SET_ROOM, SEND_MESSAGE, SET_MESSAGE, UPDATE_ROOM, SWITCH_THEME, ALTER_TIMESTAMP, CTRL_SUBMIT, CHANGE_LANGUAGE, RESET_DEFAULT, UNREAD_MESSAGE } from '../constants/constants';

export const fetchDummyRooms = () => (dispatch: any) => {
    dispatch({type: ROOMS_LOADING});
    fetch(`${process.env.API}rooms`)
    .then(res => res.json())
    .then(data => dispatch({type: ROOMS_LOADED, payload: data}))
    .catch(e => dispatch({type: ROOMS_FAILED, payload: e}));
}

export const changeUsername = (text: string)=> ({
    type: CHANGE_USERNAME,
    payload: text
});

export const switchChatMode = (value: boolean) => ({
    type: IS_CHATTING,
    payload: value
});

export const setRoom = (room : object) =>({
    type: SET_ROOM,
    payload: room
});

export const sendMessage = (chat: object) => ({
    type: SEND_MESSAGE,
    payload: chat
});

export const setMessage = (text: string) => ({
    type: SET_MESSAGE,
    payload: text
});

export const updateRoom = ()=>({
    type: UPDATE_ROOM
});

export const switchThemes = (theme: string) => ({
    type: SWITCH_THEME,
    payload: theme
});

export const alterTimeStamp = (hours: string) => ({
    type: ALTER_TIMESTAMP,
    payload: hours
});

export const changeLanguage = (language: string) =>({
    type: CHANGE_LANGUAGE,
    payload: language
});

export const useCtrlSubmit = (option: string) => ({
    type: CTRL_SUBMIT,
    payload: option
});

export const resetToDefault = () => ({
    type: RESET_DEFAULT
});

export const isMessageUnread = (value: boolean) => ({
    type: UNREAD_MESSAGE,
    payload: value
});
