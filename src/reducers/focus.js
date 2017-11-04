
import constants from '../configs/constants';



const model = {
    
    focus_now: '',
    focus_today: [],
    focus_table_loading: true,
    focus_modal_visbale: true,
}


export default function reducer(state = model, action) {

    switch (action.type) {

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


