
import * as fetchRequest from './request';
import constants from '../configs/constants';

export function FETCH_FOCUS_POST(focus) {
    return fetchRequest.post(constants.DOMAIN + '/focus', focus);
}

export function FETCH_FOCUS_COMPLATE_PUT(id) {
    return fetchRequest.put(constants.DOMAIN + '/focus-complete/' + id);
}

export function FETCH_FOCUS_STAR_PUT(id) {
    return fetchRequest.put(constants.DOMAIN + '/focus-star/' + id);
}

export function FETCH_FOCUS_DELETE(id) {
    return fetchRequest.remove(constants.DOMAIN + '/focus/' + id);
}

export function FETCH_FOCUS() {
    return fetchRequest.get(constants.DOMAIN + '/focus');
}

export function FETCH_FOCUS_NOW() {
    return fetchRequest.get(constants.DOMAIN + '/focus-star');
}
