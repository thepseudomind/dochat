import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './chat.scss';
import CircularAvatar from '../../components/CircularAvatar/CircularAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileBeam } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { switchChatMode, setRoom, setMessage, sendMessage, updateRoom, isMessageUnread } from '../../store/actions/actions';
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
        ctrlEnterSubmit: string,
        theme: string,
        language: string
    }
}

const ChatPage : React.FunctionComponent = ()=>{
    const dispatch = useDispatch();
    const activeUser = useSelector((state: ChatPageProps) => state.chat.activeUser);
    const rooms =  useSelector((state: ChatPageProps) => state.room.rooms);
    const chatting = useSelector((state: ChatPageProps) => state.room.chatting);
    const chatMessage = useSelector((state: ChatPageProps) => state.room.chatMessage);
    const activeRoom = useSelector((state: ChatPageProps) => state.room.activeRoom);
    const roomAvatar = useSelector((state: ChatPageProps) => state.room.activeRoom.avatar);
    const roomName = useSelector((state: ChatPageProps) => state.room.activeRoom.room);
    const roomMessages = useSelector((state: ChatPageProps) => state.room.activeRoom.messages);
    const currentTime = useSelector((state: ChatPageProps) => state.settings.clock);
    const ctrlEnterSubmit = useSelector((state: ChatPageProps) => state.settings.ctrlEnterSubmit);
    const theme = useSelector(((state : ChatPageProps) => state.settings.theme));
    const language = useSelector(((state : ChatPageProps) => state.settings.language));
    const unreadMessage = useSelector(((state : ChatPageProps) => state.room.unreadMessage));

    //automatically open messages if an unread message came in while user was on the settings page 
    useEffect(()=>{
        if(unreadMessage){
            dispatch(isMessageUnread(false));
            dispatch(switchChatMode(true));
            Array.from(document.querySelectorAll('.chat__box')).forEach((v) => v?.scrollTo({top: v.scrollHeight, left: 0, behavior: 'smooth'}));
        }
    }, []);

    //Setup to receive messages from server and close socket on exit from chat pages
    useEffect(()=>{
        socket.on('musicboard', ({name, message, date})=>{
            dispatch(sendMessage({name, message, date}));
            Array.from(document.querySelectorAll('.chat__box')).forEach((v) => v?.scrollTo({top: v.scrollHeight, left: 0, behavior: 'smooth'}));
        });
        return ()=>{
            socket.off(('musicboard'));
        }
    }, []);

    //Send message across socket and clear input field
    const submitMessage = () =>{
        socket.emit('musicboard', {name: activeUser, message: chatMessage, date: new Date()});
        dispatch(setMessage(''));
    }

    //Parse timestamps for each message and render based on 12 or 24 hour setting in settings
    const parseTime = (date: Date) => (new Date(date).toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', hour12: (currentTime === '12hour')}));

    //Parse messages to know if there are links, youtube videos, images or just text
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
                        <img src={link} className="chat__media"/>
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
                        <iframe className="chat__media" src={`https://www.youtube.com/embed/${embedCode}`} frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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

    return chatting ?
    <div className={`chat${theme === 'light' ? '': ' dark'}`}>
        <div className={`chat__heading${theme === 'light' ? '': ' dark'}`}>
            <div className="chat__heading--profile">
                <CircularAvatar altText="User" imageUrl={roomAvatar}/>
                <div className="chat__heading--user">
                    <span className="chat__heading--user--name">{roomName}</span>
                    <span className="chat__heading--user--status">Online</span>
                </div>
            </div>
            <FontAwesomeIcon icon={faTimes} className="chat__heading--close" onClick={()=>{
                dispatch(switchChatMode(false));
                dispatch(updateRoom());
            }}/>
        </div>
        <div className="chat__box">
            {
                (roomMessages) ? roomMessages.map((v: any, i) => <span key={i} className={`chat__box--messages${v.name !== activeUser ? '' : ' user'}`}><span className={`chat__box--messages--time${theme === 'light' ? '': ' dark'}`}><p>{`${(v.name !== activeUser) ? v.name : ''}`}</p>{parseTime(v.date)}</span><span className={`chat__box--messages--bubble${v.name !== activeUser ? '' : ' user'}${theme === 'light' ? '': ' dark'}`}>{parseText(v.message)}</span></span>) : null
            }
        </div>
        <div className={`chat__input${theme === 'light' ? '': ' dark'}`}>
            <input type="text" name="messageBox" id="messageBox" placeholder="Type something" className={`chat__input--textfield${theme === 'light' ? '': ' dark'}`} autoComplete="off" 
                value = {chatMessage} 
                onChange={(e)=>dispatch(setMessage(e.target.value))} 
                onKeyPress={(e)=>{
                    // Detecting key combination to send message 
                    if(ctrlEnterSubmit === 'on'){
                        if(e.ctrlKey && e.key === 'Enter'){
                            submitMessage();
                        }
                    }
                }}
            />
            <span className={`chat__input--smileys${theme === 'light' ? '': ' dark'}`}><FontAwesomeIcon icon={faSmileBeam}/></span>
            <button type="submit" className={`chat__input--send${theme === 'light' ? '': ' dark'}`} onClick={(e)=>{
                e.preventDefault();
                submitMessage();
            }}><FontAwesomeIcon icon={faTelegramPlane}/></button>
        </div>
    </div> : <div className={`chat inactive${theme === 'light' ? '': ' dark'}`}>{(language === 'luxembourgish') ? 'Nee aktiv Chat' : 'No active chats'}... 😢</div>
}

export default ChatPage;

