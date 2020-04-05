import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunkMiddleWare from 'redux-thunk';
import { persistStore } from 'redux-persist';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare, logger));
const persistor = persistStore(store);

export {store, persistor};