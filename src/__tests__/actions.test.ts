import { ROOMS_FAILED, ROOMS_LOADED, ROOMS_LOADING, CHANGE_USERNAME, IS_CHATTING, SET_ROOM, SEND_MESSAGE, SET_MESSAGE, UPDATE_ROOM, SWITCH_THEME, ALTER_TIMESTAMP, CTRL_SUBMIT, CHANGE_LANGUAGE, UNREAD_MESSAGE } from '../store/constants/constants';
import * as actions from '../store/actions/actions';

describe('test actions', ()=>{
    it('changes username', ()=>{
        expect(actions.changeUsername('hello')).toEqual({type: CHANGE_USERNAME, payload: 'hello'})
    })

    it('set chatting mode for user', ()=>{
        expect(actions.switchChatMode(false)).toEqual({type: IS_CHATTING, payload: false})
    })

    it('set active chatroom', ()=>{
        expect(actions.setRoom({id: '7'})).toEqual({type: SET_ROOM, payload: {id: '7'}})
    })

    it('send message', ()=>{
        expect(actions.sendMessage({name: 'kunle', message: 'i love you', date: ''})).toEqual({type: SEND_MESSAGE, payload: {name: 'kunle', message: 'i love you', date: ''}})
    })

    it('set message in input field', ()=>{
        expect(actions.setMessage('holla')).toEqual({type: SET_MESSAGE, payload: 'holla'})
    })

    it('update user rooms', ()=>{
        expect(actions.updateRoom([{name: 'kunle', message: 'i love you', date: ''}])).toEqual({type: UPDATE_ROOM, payload: [{name: 'kunle', message: 'i love you', date: ''}]})
    })

    it('switch app theme', ()=>{
        expect(actions.switchThemes('beige')).toEqual({type: SWITCH_THEME, payload: 'beige'})
    })

    it('change time stamp', ()=>{
        expect(actions.alterTimeStamp('hourly')).toEqual({type: ALTER_TIMESTAMP, payload: 'hourly'})
    })

    it('set CtrlSubmit status', ()=>{
        expect(actions.useCtrlSubmit('yes or no')).toEqual({type: CTRL_SUBMIT, payload: 'yes or no'})
    })
    
    it('set user language', ()=>{
        expect(actions.changeLanguage('portuguese')).toEqual({type: CHANGE_LANGUAGE, payload: 'portuguese'})
    }) 

    it('set unread messages notification', ()=>{
        expect(actions.isMessageUnread(false)).toEqual({type: UNREAD_MESSAGE, payload: false})
    }) 
})