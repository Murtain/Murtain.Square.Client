
import constants from '../configs/constants';


const model = {
    welcome_date: '',
    welcome_time: '',
    welcome_text: '你好',
}

export default function reducer(state = model, action) {

    switch (action.type) {
        case "INDEX_TIME_FETCH_SUCCESSED":
            return Object.assign({ ...state }, { ...action.payload });
        default:
            return state;
    }
}


