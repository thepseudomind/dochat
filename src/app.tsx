import './app.scss';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/setupStore';
import NavbarMobile from './components/Navbar/NavbarMobile';
import RouterMobile from './routes/mobile/mobile';
import RouterDesktop from './routes/desktop/desktop';
import ChatPage from './components/ChatBox/ChatBox';

interface AppProps{
    settings: {
        theme: string
    }
}

const DoChat : React.FunctionComponent = ()=> {
    const theme = useSelector(((state : AppProps) => state.settings.theme));

    //Track changes in theme and alter webpage's body default background color
    useEffect(()=>{
        theme === 'dark' ? document.body.style.backgroundColor = '#373C49': document.body.style.backgroundColor = 'white';
    }, [theme]);

    return (
        <Router>
            <div className={`home${theme === 'light' ? '': ' dark'}`}>
                {/* Mobile-specific Components and Layout */}
                <NavbarMobile/>
                <RouterMobile/>

                {/* Desktop-specific Components and Layout */}
                <RouterDesktop/>
                <ChatPage/>
            </div>
        </Router>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <DoChat/>
        </PersistGate>
    </Provider>,
    document.getElementById('app')
);

