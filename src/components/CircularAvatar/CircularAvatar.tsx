import React from 'react';
import './CircularAvatar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

interface CircularAvatarProps{
    altText?: string,
    imageUrl?: string
}

const CircularAvatar : React.FunctionComponent<CircularAvatarProps> = ({imageUrl, altText})=>{
    {
        return imageUrl ? <img src={imageUrl} alt={altText} className="circular__avatar"/> : <div className="circular__avatar empty"><FontAwesomeIcon icon={faUserAlt} className="circular__avatar--icon"/></div>
    }
};

export default CircularAvatar;