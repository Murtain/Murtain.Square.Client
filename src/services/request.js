import NProgress from 'nprogress';
import { UserFriendlyError, NetWorkError, FetchError, FetchTimeoutError, JsonSerializeError } from './errors';

import constants from '../configs/constants';


export function get(url) {

    var fetchPromise = fetch(url);
    return _fetch(fetchPromise, constants.FETCH_TIMOUT).then(filterStatus).then(stopProgress).then(filterJSON).then(filterLogger).catch(filterError);
}

export function post(url, body) {
    console.warn('[fetch-post-body-begin     ] ');
    var fetchPromise = fetch(url,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

    console.warn('[fetch-post-body      ] ', url, body);
    return _fetch(fetchPromise, constants.FETCH_TIMOUT).then(filterStatus).then(stopProgress).then(filterJSON).then(filterLogger).catch(filterError);
}

export function put(url, body) {
    console.warn('[fetch-put-begin       ] ');
    var fetchPromise = fetch(url,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

    console.warn('[fetch-put-body       ] ', url, body);
    return _fetch(fetchPromise, constants.FETCH_TIMOUT).then(filterStatus).then(stopProgress).then(filterJSON).then(filterLogger).catch(filterError);
}

export function remove(url, body) {
    console.warn('[fetch-delete-begin       ] ');
    var fetchPromise = fetch(url,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

    console.warn('[fetch-delete-body    ] ', url, body);
    return _fetch(fetchPromise, constants.FETCH_TIMOUT).then(filterStatus).then(stopProgress).then(filterJSON).then(filterLogger).catch(filterError);
}


function filterStatus(response) {
    console.warn('[fetch-filter-status-begin       ] ');
    console.warn('[fetch-filter-status  ] ', response.url, response.status);

    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    return response.json().then(resp => {
        console.warn('[fetch-filter-status-user-friendly-error  ] ');
        throw new UserFriendlyError(resp.error.code, resp.error.message);
    }).catch(e => {

        if (e instanceof UserFriendlyError) {
            throw e;
        }
        console.warn('[fetch-filter-status-network-error  ] ');
        throw new NetWorkError(response.status);
    });

}

function filterJSON(response) {
    console.warn('[fetch-filter-serializer-begin     ] ');

    return response.json().then(data => {
        return { data };
    }).catch(e => {
        return { response };
    });

}

function filterLogger(response) {
    console.warn('[fetch-filter-logger-begin     ] ');
    console.warn('[fetch-filter-logger] ', response)
    return response;
}

function filterError(error) {

    console.warn('[fetch-filter-error     ] ',error);
    if (error instanceof TypeError) {
        return { error: new FetchError(error.message) };
    }

    return { error };
}

function stopProgress(response) {
    console.warn('[fetch-filter-stop-progress-begin     ] ');
    NProgress.done(true);
    console.warn('[fetch-filter-stop-progress]  nprogress done.');
    return response;
}

function _fetch(fetch_promise, timeout) {

    NProgress.start();

    var abort_fn = null;

    var abort_promise = new Promise(function (resolve, reject) {
        abort_fn = function () {
            NProgress.done(true);
            reject(new FetchTimeoutError);
        };
    });

    var abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);

    setTimeout(function () {
        abort_fn();
    }, timeout);

    return abortable_promise;
}


