
import constants from '../configs/constants';



const model = {
    settings_modal_visbale: false,
    settings_modal_component: 'focuses',
}

export default function reducer(state = model, action) {

    switch (action.type) {
        case "INDEX_SETTINGS_MODAL_TOGGLE_SUCCEED":
            return Object.assign({ ...state }, { settings_modal_visbale: action.payload });

        case "INDEX_SETTINGS_MODAL_COMPONENT_CHANGED":
            return Object.assign({ ...state }, { settings_modal_component: action.payload });
        default:
            return state;
    }
}


