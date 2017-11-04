
import constants from '../configs/constants';


const model = {
    sentence: '',
    sentence_heart_icon: constants.sentence_heart_icons_empty,
}

export default function reducer(state = model, action) {

    switch (action.type) {
        case "INDEX_SENTENCE_FETCH_SUCCEED":
            return Object.assign({ ...state }, { sentence: action.payload });

        case "INDEX_SENTENCE_HEART_FETCH_SUCCEED":
            return Object.assign({ ...state }, { sentence_heart_icon: action.payload });
        default:
            return state;
    }
}


