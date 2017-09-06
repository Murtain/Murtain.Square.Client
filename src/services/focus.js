
import * as fetchRequest from './request';
import config from '../configs';

export function fetch_focus_post(focus) {
    return fetchRequest.post(config.domain + '/focus', focus);
}

export function fetch_focus_complate_put(id) {
    return fetchRequest.put(config.domain + '/focus-complete/' + id);
}

export function fetch_focus_star_put(id) {
    return fetchRequest.put(config.domain + '/focus-star/' + id);
}

export function fetch_focus_delete(id) {
    return fetchRequest.remove(config.domain + '/focus/' + id);
}

export function fetch_focus() {
    return fetchRequest.get(config.domain + '/focus');
}

export function fetch_focus_now() {
    return fetchRequest.get(config.domain + '/focus-star');
}
