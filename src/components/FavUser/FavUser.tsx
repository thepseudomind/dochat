import React from 'react';
import './FavUser.scss';
import CircularAvatar from '../CircularAvatar/CircularAvatar';

interface FavUserProps {
    imageUrl: string,
    name: string
}

const FavUser : React.FunctionComponent<FavUserProps> = ({imageUrl, name})=>(
    <div className="fav">
        <CircularAvatar altText="User" imageUrl={imageUrl}/>
        <p className="fav__name">{name}</p>
    </div>
);

export default FavUser;