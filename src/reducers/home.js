
import constants from '../configs/constants';



const model = {

    welcome_date: '',
    welcome_time: '',
    welcome_text: '你好',

    settings_modal_visbale: false,
    settings_modal_component: 'focuses',

    focus_now: '',
    focus_today: [],
    focus_table_loading: true,
    focus_modal_visbale: true,

    sentence: '',
    sentence_heart_icon: constants.sentence_heart_icons_empty,

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
export default function reducer(state = model, action) {

    switch (action.type) {

        case "INDEX_TIME_FETCH_SUCCESSED":
            return Object.assign({ ...state }, { welcome_time: action.payload.welcome_time, welcome_text: action.payload.welcome_text, welcome_date: action.payload.welcome_date });

        case "INDEX_SENTENCE_FETCH_SUCCEED":
            return Object.assign({ ...state }, { sentence: action.payload });

        case "INDEX_SENTENCE_HEART_FETCH_SUCCEED":
            return Object.assign({ ...state }, { sentence_heart_icon: action.payload });

        case "INDEX_WEATHER_FETCH_SUCCEED":
            return Object.assign({ ...state }, { weather: action.payload });

        case "INDEX_SETTINGS_MODAL_TOGGLE_SUCCEED":
            return Object.assign({ ...state }, { settings_modal_visbale: action.payload });

        case "INDEX_SETTINGS_MODAL_COMPONENT_CHANGED":
            return Object.assign({ ...state }, { settings_modal_component: action.payload });

        case "INDEX_FOCUS_MODAL_TOGGLE_SUCCEED":
            return Object.assign({ ...state }, { focus_modal_visbale: action.payload });

        case "INDEX_FOCUS_ADD_SUCCEED":
            return Object.assign({ ...state }, { focus_modal_visbale: false });

        case "INDEX_FETCH_FOCUSES_START":
            return Object.assign({ ...state }, { focus_table_loading: true });

        case "INDEX_FETCH_FOCUSES_SUCCEED":
            return Object.assign({ ...state }, { focus_table_loading: false, focus_today: action.payload });

        case "INDEX_FETCH_FOCUSES_NOW_SUCCEED":
            return Object.assign({ ...state }, { focus_now: action.payload });
        default:
            return state;
    }
}


