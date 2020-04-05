import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ListTile.scss';
import CircularAvatar from '../CircularAvatar/CircularAvatar';
import { switchChatMode, setRoom, setMessage, updateRoom } from '../../store/actions/actions';

interface ListTileProps {
    imageUrl: string,
    name: string,
    id: number
}

interface RoomsState{
    room: {
        rooms: Array<{id: number, room: string, avatar: string, messages: Array<{name: string, message: string, date: string}>}>,
        activeRoom: {id: number, room: string, avatar: string, messages: Array<{name: string, message: string, date: string}>}
    },
    settings: {
        clock: string,
        theme: string
    }
}

const ListTile : React.FunctionComponent<ListTileProps>= ({id, name, imageUrl})=>{
    const dispatch = useDispatch();
    const room = useSelector((state: RoomsState) => state.room.rooms[id-1]);
    const activeRoom = useSelector((state: RoomsState) => state.room.activeRoom);
    const currentTime = useSelector((state: RoomsState) => state.settings.clock);
    const theme = useSelector(((state : RoomsState) => state.settings.theme));

    const parseTime = (date: string) => (new Date(date).toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', hour12: (currentTime === '12hour')}));

    return (
        <div className={`list-tile${theme === 'light' ? '': ' dark'}`} onClick={()=>{
            dispatch(switchChatMode(true));
            dispatch(setMessage(''));
            dispatch(setRoom(room));
        }}>
            <CircularAvatar altText="User" imageUrl={imageUrl}/>
            <p className="list-tile__text">
                <span className="list-tile__text--title">{name}</span>
                <span className="list-tile__text--comment">{((room.id === activeRoom.id) && (activeRoom.messages.length > 0)) ? activeRoom.messages[activeRoom.messages.length-1].message : ''}</span>
            </p>
            <span className="list-tile__time">{((room.id === activeRoom.id) && (activeRoom.messages.length > 0)) ? parseTime(activeRoom.messages[activeRoom.messages.length-1].date) : ''}</span>
        </div>
    );
};

export default ListTile;