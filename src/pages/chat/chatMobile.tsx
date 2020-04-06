import React, { createRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './chat.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileBeam } from '@fortawesome/free-regular-svg-icons';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { setMessage, switchChatMode, isMessageUnread } from '../../store/actions/actions';
import io from 'socket.io-client';
import ReactEmoji from 'react-emoji';

let socket =  io.connect(`${process.env.SERVER}`);

interface ChatPageProps {
    chat: {
        activeUser: string
    },
    room:{
        chatting: boolean,
        chatMessage: string,
        activeRoom: {id: number, room: string, avatar: string, messages: any[]},
        rooms: Array<{id: number, room: string, avatar: string, messages: any[]}>,
        unreadMessage: boolean
    },
    settings: {
        clock: string,
        theme: string
    }
}


const ChatPageMobile = ()=> {
    const dispatch = useDispatch();
    const activeUser = useSelector((state: ChatPageProps) => state.chat.activeUser);
    const chatMessage = useSelector((state: ChatPageProps) => state.room.chatMessage);
    const roomMessages = useSelector((state: ChatPageProps) => state.room.activeRoom.messages);
    const currentTime = useSelector((state: ChatPageProps) => state.settings.clock);
    const theme = useSelector(((state : ChatPageProps) => state.settings.theme));
    const chatting = useSelector(((state : ChatPageProps) => state.room.chatting));
    const unreadMessage = useSelector(((state : ChatPageProps) => state.room.unreadMessage));

    //Scroll down to most recent message when number of messages change
    useEffect(()=>{
        Array.from(document.querySelectorAll('.chat-mobile__body')).forEach((v) => v?.scrollTo({top: v.scrollHeight, left: 0, behavior: 'smooth'}))
    }, [roomMessages])

    const submitMessage = () =>{
        socket.emit('musicboard', {name: activeUser, message: chatMessage, date: new Date()});
        dispatch(setMessage(''));
    }

    const parseTime = (date: Date) => (new Date(date).toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', hour12: (currentTime === '12hour')}));

    const parseText = (message: string) => {
        let arrayOfString: Array<any>, linkIndex: number, link: string, text: string, embedCode: string;
        switch(true){
            case (message.includes('http') && ((message.includes('png') || message.includes('jpg') || message.includes('jpeg')))): 
                arrayOfString = message.split(' ');
                linkIndex = arrayOfString.findIndex(a => (a.includes('http') || a.includes('www')));
                link = arrayOfString.splice(linkIndex, 1).toString();
                text = arrayOfString.join(' ');
                return (
                    <div>
                        <img src={link} className="chat-mobile__media"/>
                        <p>{ReactEmoji.emojify(text)}</p>
                    </div>
                );
            case (message.includes('http') || message.includes('https')) && ((message.includes('youtube') || message.includes('youtu.be'))):
                arrayOfString = message.split(' ');
                linkIndex = arrayOfString.findIndex(a => (a.includes('http') || a.includes('www') || a.includes('youtube') || a.includes('youtu.be')));
                link = arrayOfString.splice(linkIndex, 1).toString();
                text = arrayOfString.join(' ');
                embedCode = link.toString().slice(-11);
                return (
                    <div>
                        <iframe className="chat-mobile__media" src={`https://www.youtube.com/embed/${embedCode}`} frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <p>{ReactEmoji.emojify(text)}</p>
                    </div>
                );
            case (message.includes('http') || message.includes('https')):
                arrayOfString = message.split(' ');
                linkIndex = arrayOfString.findIndex(a => (a.includes('http') || a.includes('www')));
                link = arrayOfString.splice(linkIndex, 1).toString();
                text = arrayOfString.join(' ');
                return (
                    <div>
                        <a href={link} target="_blank" className="chat__link">{link}</a>
                        <p>{ReactEmoji.emojify(text)}</p>
                    </div>
                );
            default:
                return ReactEmoji.emojify(message);
        }
    }

    return (
        <div className={`chat-mobile${theme === 'light' ? '': ' dark'}`}>
            <div className={`chat-mobile__body${theme === 'light' ? '': ' dark'}`}>
                {
                    (roomMessages) ? roomMessages.map((v: any, i) => <h1 key={i} className={`chat-mobile__body--messages${v.name !== activeUser ? '' : ' user'}${theme === 'light' ? '': ' dark'}`}><span className={`chat-mobile__body--time${v.name !== activeUser ? '' : ' user'}${theme === 'light' ? '': ' dark'}`}><p>{`${(v.name !== activeUser) ? v.name : ''}`}</p>{parseTime(v.date)}</span><span className="chat-mobile__body--message">{parseText(v.message)}</span></h1>) : null 
                }
            </div>
            <div className={`chat-mobile__input${theme === 'light' ? '': ' dark'}`}>
                <span className={`chat-mobile__input--smileys${theme === 'light' ? '': ' dark'}`}><FontAwesomeIcon icon={faSmileBeam}/></span>
                <input type="text" name="message" id="message" autoComplete="off" className={`chat-mobile__input--textfield${theme === 'light' ? '': ' dark'}`} placeholder="Type something" value = {chatMessage} onChange={(e)=>dispatch(setMessage(e.target.value))}/>
                <button type="submit" className={`chat-mobile__input--send${theme === 'light' ? '': ' dark'}`} onClick={(e)=>{
                    e.preventDefault();
                    submitMessage();
                }}><FontAwesomeIcon icon={faTelegramPlane}/></button>
            </div>
        </div>
    );
}

export default ChatPageMobile;