import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDummyRooms } from '../../store/actions/actions';
import './Chatlist.scss';
import ListTile from '../ListTile/ListTile';

const ChatlistMobile : React.FunctionComponent = ()=>{
    interface UserState {
        room: {
            rooms: Array<{id: number, room: string, avatar: string, messages: any[]}>
        },
        settings: {
            theme: string
        }
    }

    const dispatch = useDispatch();
    const rooms = useSelector((state: UserState) => state.room.rooms);
    const theme = useSelector(((state : UserState) => state.settings.theme));

    useEffect(()=>{
        dispatch(fetchDummyRooms());
    }, []);

    return (
        <section className={`chatlist-mobile${theme === 'light' ? '': ' dark'}`}>
            {
                rooms.map((v: any) => <ListTile key={v.id} id={v.id} name={v.room} imageUrl = {v.avatar}/>)
            }
        </section>
    );
}

export default ChatlistMobile;
