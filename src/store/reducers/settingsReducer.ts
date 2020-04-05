import { SWITCH_THEME, ALTER_TIMESTAMP, CTRL_SUBMIT, CHANGE_LANGUAGE, RESET_DEFAULT } from '../constants/constants';

const initialSettings = {
    theme: 'light',
    clock: '12hour',
    ctrlEnterSubmit: 'on',
    language: 'english'
}

const defaultSettings = Object.assign({}, initialSettings);

type Action = {
    type: string,
    payload: any
}

export const settingsReducer = (state = initialSettings, action: Action)=>{
    switch(action.type){
        case SWITCH_THEME:
            return {...state, theme: action.payload};
        case ALTER_TIMESTAMP:
            return {...state, clock: action.payload};
        case CTRL_SUBMIT:
            return {...state, ctrlEnterSubmit: action.payload};
        case CHANGE_LANGUAGE:
            return {...state, language: action.payload};
        case RESET_DEFAULT:
            return Object.assign({}, initialSettings, defaultSettings);
        default:
            return state;
    }
}