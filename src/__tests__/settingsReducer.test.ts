import { SWITCH_THEME, ALTER_TIMESTAMP, CTRL_SUBMIT, CHANGE_LANGUAGE, RESET_DEFAULT } from '../store/constants/constants';
import {settingsReducer} from '../store/reducers/settingsReducer';

describe('testing settings', ()=>{
    const initialSettings = {
        theme: 'light',
        clock: '12hour',
        ctrlEnterSubmit: 'on',
        language: 'english'
    }

    it('should return initial state', ()=>{
        expect(settingsReducer(undefined, {type: '', payload: ''}))
        .toEqual(initialSettings)
    })

    it('should change theme', ()=>{
        expect(settingsReducer(initialSettings, {type: SWITCH_THEME, payload: 'newTheme'}))
        .toEqual({...initialSettings, theme: 'newTheme'})
    })

    it('should change timestamp for messages', ()=>{
        expect(settingsReducer(initialSettings, {type: ALTER_TIMESTAMP, payload: '48 hours'}))
        .toEqual({...initialSettings, clock: '48 hours'})
    })

    it('use Ctrl+Submit to send messages', ()=>{
        expect(settingsReducer(initialSettings, {type: CTRL_SUBMIT, payload: 'status'}))
        .toEqual({...initialSettings, ctrlEnterSubmit: 'status'})
    })

    it('change user language', ()=>{
        expect(settingsReducer(initialSettings, {type: CHANGE_LANGUAGE, payload: 'spanish'}))
        .toEqual({...initialSettings, language: 'spanish'})
    })

    it('reset settings to default', ()=>{
        expect(settingsReducer(initialSettings, {type: RESET_DEFAULT, payload: undefined}))
        .toEqual(Object.assign({}, initialSettings))
    })
})