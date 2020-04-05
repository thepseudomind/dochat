import { combineReducers } from 'redux';
import { roomsReducer } from './roomsReducer';
import { settingsReducer } from './settingsReducer';
import { chatReducer } from './chatReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['settings']
};

const rootReducer = combineReducers({room: roomsReducer, settings: settingsReducer, chat: chatReducer});

export default persistReducer(persistConfig, rootReducer);