
import constants from '../configs/constants';



const model = {
    city: '',
    weather: '',
    temp: '',
};


export default function reducer(state = model, action) {

    switch (action.type) {

        case "INDEX_WEATHER_FETCH_SUCCEED":
            return Object.assign({ ...state }, { ...action.payload });

        default:
            return state;
    }
}


