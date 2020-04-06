import { ROOMS_FAILED, ROOMS_LOADED, ROOMS_LOADING, IS_CHATTING, SET_MESSAGE, SET_ROOM, SEND_MESSAGE, UPDATE_ROOM, UNREAD_MESSAGE } from '../constants/constants';

type Action = {
    type: string,
    payload: any
}

type roomStateProps = {
    rooms: Array<{id: number, room: string, avatar: string, messages: Array<{name: string, message: string, date: string}>}>,
    activeRoom: {id: number, room: string, avatar: string, messages: Array<{name: string, message: string, date: string}>},
    isLoading: boolean,
    error: string,
    chatting: boolean,
    chatMessage: string,
    unreadMessage: boolean
}

const initialRooms: roomStateProps = {
    chatting: false,
    chatMessage: '',
    rooms: [],
    activeRoom: {id: 0, room: '', avatar: '', messages: []},
    isLoading: false,
    error: '',
    unreadMessage: false
}

export const roomsReducer = (state = initialRooms, action: Action) => {
    switch(action.type){
        case ROOMS_LOADING:
            return {...state, isLoading: true};
        case ROOMS_LOADED:
            return {...state, isLoading: false, rooms: action.payload};
        case ROOMS_FAILED:
            return {...state, isLoading: false, error: action.payload};
        case SET_ROOM:
            return {...state, activeRoom: action.payload};
        case UPDATE_ROOM: 
            let newRooms: Array<{id: number, room: string, avatar: string, messages: Array<{name: string, message: string, date: string}>}> = [];
            fetch(`${process.env.API}rooms/${state.activeRoom.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state.activeRoom)
            }).then(res => res.json())
            .then(data => newRooms = state.rooms.map(v => (v.id === data.id) ? data : v))
            .catch(e => console.log(e))
            return {...state, rooms: [...newRooms]};
        case IS_CHATTING:
            return {...state, chatting: action.payload};
        case SET_MESSAGE:
            return {...state, chatMessage: action.payload};
        case SEND_MESSAGE:
            return {...state, activeRoom: Object.assign({}, state.activeRoom, {messages: [...state.activeRoom.messages ,action.payload]})};
        case UNREAD_MESSAGE:
            return {...state, unreadMessage: action.payload};
        default:
            return state;
    }
}