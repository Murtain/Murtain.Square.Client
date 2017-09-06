
import * as ACTION_TYPE from '../constants';


const initialState = {

    welcome_date: '',
    welcome_time: '',
    welcome_text: '你好',

    settings_modal_visbale: false,

    focus_now: '',
    focus_today: [],
    focus_table_loading: true,
    focus_modal_visbale: false,

    sentence: '',
    sentence_heart_icon: 'http://static.x-dva.com/resources/images/svg/icon-heart-empty.svg',

    weather: {
        realtime: {
            city_name: '',
            weather: {
                info: '',
                temperature: ''
            }
        },
    },

};
export default function reducer(state = initialState, action) {

    switch (action.type) {

        case ACTION_TYPE.INDEX_TIME_FETCH_SUCCESSED:
            return Object.assign({ ...state }, { welcome_time: action.payload.welcome_time, welcome_text: action.payload.welcome_text, welcome_date: action.payload.welcome_date });

        case ACTION_TYPE.INDEX_SENTENCE_FETCH_SUCCEED:
            return Object.assign({ ...state }, { sentence: action.payload });

        case ACTION_TYPE.INDEX_SENTENCE_HEART_FETCH_SUCCEED:
            return Object.assign({ ...state }, { sentence_heart_icon: action.payload });

        case ACTION_TYPE.INDEX_WEATHER_FETCH_SUCCEED:
            return Object.assign({ ...state }, { weather: action.payload });

        case ACTION_TYPE.INDEX_SETTINGS_MODAL_TOGGLE_SUCCEED:
            return Object.assign({ ...state }, { settings_modal_visbale: action.payload });

        case ACTION_TYPE.INDEX_FOCUS_MODAL_TOGGLE_SUCCEED:
            return Object.assign({ ...state }, { focus_modal_visbale: action.payload });

        case ACTION_TYPE.INDEX_FOCUS_ADD_SUCCEED:
            return Object.assign({ ...state }, { focus_modal_visbale: false });

        case ACTION_TYPE.INDEX_FETCH_FOCUSES_START:
            return Object.assign({ ...state }, { focus_table_loading: true });

        case ACTION_TYPE.INDEX_FETCH_FOCUSES_SUCCEED:
            return Object.assign({ ...state }, { focus_table_loading: false, focus_today: action.payload });
            
        default:
            return state;
    }
}


