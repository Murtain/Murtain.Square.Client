
import * as fetchRequest from '../request';
import * as config from '../../configs';
import userManager from '../userManager';



export function fetch_todos(payload) {

    const { page, limit } = payload;

    const url = 'http://cangdu.org/shopro/data/record?page=1&type=FAILED';

    console.warn('[fetch][fetch-todos] ', url);

    return fetchRequest.get(url).then(response => {

        console.warn('[fetch][fetch-todos] ', response.data.data);

        return response.data.data;
    });
}

