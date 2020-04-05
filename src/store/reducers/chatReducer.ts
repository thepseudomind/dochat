import { CHANGE_USERNAME } from '../constants/constants';

const initialState = {
    activeUser: 'kenny'
}

export const chatReducer = (state = initialState, action: any) => {
    switch(action.type){
        case CHANGE_USERNAME:
            return {...state, activeUser: action.payload};
        default:
            return state;
    }
}