import { ROOMS_FAILED, ROOMS_LOADED, ROOMS_LOADING, IS_CHATTING, SET_MESSAGE, SET_ROOM, SEND_MESSAGE, UNREAD_MESSAGE } from '../store/constants/constants';
import {roomsReducer} from '../store/reducers/roomsReducer';

describe('test rooms', ()=>{
    const initialRooms = {
        chatting: false,
        chatMessage: '',
        rooms: [],
        activeRoom: {id: 0, room: '', avatar: '', messages: []},
        isLoading: false,
        error: '',
        unreadMessage: false
    }

    it('should return initial state', ()=>{
        expect(roomsReducer(undefined, {type: '', payload: ''}))
        .toEqual(initialRooms)
    })

    it('can set rooms', ()=>{
        expect(roomsReducer(initialRooms, {type: SET_ROOM, payload: {id: '0', room: 'newRoom'}}))
        .toEqual({...initialRooms, activeRoom: {id: '0', room: 'newRoom'}})
    })

    it('is user chatting currently', ()=>{
        expect(roomsReducer(initialRooms, {type: IS_CHATTING, payload: true}))
        .toEqual({...initialRooms, chatting: true})
    })

    it('set chat message from input', ()=>{
        expect(roomsReducer(initialRooms, {type: SET_MESSAGE, payload: 'hi'}))
        .toEqual({...initialRooms, chatMessage: 'hi'})
    })

    it('send message from input to rooms', ()=>{
        expect(roomsReducer(initialRooms, {type: SEND_MESSAGE, payload: {name: 'kenny', message: '', date: ''}}))
        .toEqual({...initialRooms, activeRoom: Object.assign({}, initialRooms.activeRoom, {messages: [...initialRooms.activeRoom.messages, {name: 'kenny', message: '', date: ''}]})})
    })

    it('is there an unread message', ()=>{
        expect(roomsReducer(initialRooms, {type: UNREAD_MESSAGE, payload: true}))
        .toEqual({...initialRooms, unreadMessage: true})
    })
    
});



describe('fetch rooms', ()=>{
    const initialRooms = {
        chatting: false,
        chatMessage: '',
        rooms: [],
        activeRoom: {id: 0, room: '', avatar: '', messages: []},
        isLoading: false,
        error: '',
        unreadMessage: false
    }

    it('should return initial state', ()=>{
        expect(roomsReducer(undefined, {type: '', payload: ''}))
        .toEqual(initialRooms)
    })

    it('is rooms loading from api', ()=>{
        expect(roomsReducer(undefined, {type: ROOMS_LOADING, payload: true}))
        .toEqual({...initialRooms, isLoading: true})
    })

    it('did rooms fail to load', ()=>{
        expect(roomsReducer(undefined, {type: ROOMS_FAILED, payload: 'i failed'}))
        .toEqual({...initialRooms, error: 'i failed'})
    })

    it('did rooms load sucessfully', ()=>{
        expect(roomsReducer(undefined, {type: ROOMS_LOADED, payload: [{data: 'dummy data'}]}))
        .toEqual({...initialRooms, rooms : [{data: 'dummy data'}]})
    })
})