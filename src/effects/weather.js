import { take, put, select, call, fork, takeLatest } from 'redux-saga/effects'
import { message } from 'antd'
import { toast } from '../services/errors'

import { FETCH_WEATHER } from '../services/weather'

export function* FETCH_WEATHER_TODAY() {
    const { data, error } = yield call(FETCH_WEATHER);
    if (error) return toast(error);
    yield put({ type: "INDEX_WEATHER_FETCH_SUCCEED", payload: data });
}