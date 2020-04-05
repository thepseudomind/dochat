import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDummyRooms } from '../../store/actions/actions';
import './Chatlist.scss';
import ListTile from '../ListTile/ListTile';

const Chatlist : React.FunctionComponent = ()=>{
    interface UserState {
        room: {
            rooms: Array<{id: number, room: string, avatar: string, messages: any[]}>
        }
    }

    const dispatch = useDispatch();
    const rooms = useSelector((state: UserState) => state.room.rooms);

    useEffect(()=>{
        dispatch(fetchDummyRooms());
    }, []);

    return (
        <section className="chatlist">
            {
                rooms.map((v: any) => <ListTile key={v.id} id={v.id} name={v.room} imageUrl = {v.avatar}/>)
            }
        </section>
    );
}

export default Chatlist;