
import * as fetchRequest from './request';
import constants from '../configs/constants';

export function FETCH_SENTENCE_RANDOM_GET() {
    return fetchRequest.get(constants.SQUARE_SENTENCE_URL);
}

export function FETCH_SENTENCE_HEART_PUT(sentence) {
    return fetchRequest.put(constants.DOMAIN + '/senetences/favorite', sentence);
}
