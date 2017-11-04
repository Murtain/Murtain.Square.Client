import { take, put, select, call, fork, takeLatest } from 'redux-saga/effects'
import { message } from 'antd'
import { toast } from '../services/errors'

import userManager from '../services/userManager';

export function* FETCH_USER_INFO() {

    const { user, error } = yield userManager.getUser()
        .then(user => { return { user } })
        .catch(error => { return { error } });

    if (error) return toast(error);

    yield put({ type: 'redux-oidc/USER_FOUND', payload: user });
}
