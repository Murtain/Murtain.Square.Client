
import * as fetchRequest from './request';
import constants from '../configs/constants';

export function FETCH_WEATHER() {
    return fetchRequest.get(constants.SQUARE_WEATHER_URL);
}


