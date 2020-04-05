import React, { useEffect, Dispatch } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { fetchDummyRooms } from '../../store/actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import FavUser from '../FavUser/FavUser';
import './Favorites.scss';

const Favorites : React.FunctionComponent= (props)=>{
    interface FavState {
        room: {
            rooms: []
        },
        settings: {
            theme: string
        }
    }

    const dispatch = useDispatch();
    const favs = useSelector((state: FavState) => state.room.rooms);
    const theme = useSelector(((state : FavState) => state.settings.theme));

    useEffect(()=>{
       dispatch(fetchDummyRooms());
    }, []);

    return (
        <div className={`favorites${theme === 'light' ? '': ' dark'}`}>
            <div className="favorites__top">
                <p className="favorites__top--text">favorites</p>
                <FontAwesomeIcon icon={faEllipsisH}/>
            </div>
            <div className="favorites__chats">
                {
                    favs.map((v: any) => <FavUser key={v.id} name={v['room']} imageUrl = {v.avatar}/>)
                }
            </div>
        </div>
    );
};

export default Favorites;