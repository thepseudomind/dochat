import { CHANGE_USERNAME } from '../store/constants/constants';
import {chatReducer} from '../store/reducers/chatReducer';

describe('test user', ()=>{
    const initialState = {
        activeUser: 'kenny'
    };

    it('return intial state', ()=>{
        expect(chatReducer(undefined, {})).toEqual(initialState)
    })

    it('return intial state', ()=>{
        expect(chatReducer(initialState, {type: CHANGE_USERNAME, payload: 'newName'})).toEqual({...initialState, activeUser: 'newName'})
    })
})