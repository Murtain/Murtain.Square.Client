
import NProgress from 'nprogress';
import { message } from 'antd';
import config from '../configs';


export function get(url) {

    var fetchPromise = fetch(url);
    return _fetch(fetchPromise, config.fetch_timout).then(filterStatus).then(stopProgress).then(filterJSON).then(filterLogger).catch(filterError);
}

export function post(url, body) {

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
    return _fetch(fetchPromise, config.fetch_timout).then(filterStatus).then(stopProgress).then(filterJSON).then(filterLogger).catch(filterError);
}

export function put(url, body) {

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
    return _fetch(fetchPromise, config.fetch_timout).then(filterStatus).then(stopProgress).catch(filterError);
}

export function remove(url, body) {

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
    return _fetch(fetchPromise, config.fetch_timout).then(filterStatus).then(stopProgress).catch(filterError);
}


function filterStatus(response) {
    console.warn('[fetch-filter-status  ] ', response.url, response.status);

    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    return response.json().then(resp => {
        throw new fetchError(resp.error.code, resp.error.message);
    }).catch(e => {

        if (e instanceof fetchError) {
            throw e;
        }

        throw new netWorkError(response.status);
    });

}

function filterJSON(response) {
    console.warn('[fetch-filter-tojson  ] ');
    return response.json();
}

function filterLogger(response) {
    console.warn('[fetch-filter-response] ', response)
    return response;
}

function filterError(error) {

    if (error instanceof fetchError) {
        console.warn('[fetch-filter-error   ] ', error.code);
        message.warn(error.code);
        return;
    }

    if (error instanceof netWorkError) {
        console.warn('[fetch-filter-error   ] ', error.status);
        message.error('服务器繁忙，请稍候再试。');
        return;
    }
}

function stopProgress(response) {
    console.warn('[fetch-filter-progress]  nprogress done.');
    NProgress.done(true);
    return response;
}

function _fetch(fetch_promise, timeout) {

    NProgress.start();

    var abort_fn = null;

    var abort_promise = new Promise(function (resolve, reject) {
        abort_fn = function () {
            NProgress.done(true);
            reject(new Error('request timeout.'));
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


function fetchError(code, message) {
    this.code = code;
    this.message = message;
}

function netWorkError(status) {
    this.status = status;
}