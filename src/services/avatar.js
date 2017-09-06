
import * as fetchRequest from './request';
import config from '../configs';

export function fetch_sentence_random() {
    return fetchRequest.get(config.square_sentence_url);
}

export function fetch_weather_with_ip() {
    return fetchRequest.get(config.square_weather_url);
}


