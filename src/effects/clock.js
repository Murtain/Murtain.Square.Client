import { take, put, select, call, fork, takeLatest } from 'redux-saga/effects'
import { message } from 'antd'
import { toast } from '../services/errors'

import { GET_TIME, GET_DATE, GET_WELCOME } from '../services/date'


export function* FETCH_WELCOME_TIME() {

    const welcome_date = yield call(GET_DATE)
    const welcome_time = yield call(GET_TIME)
    const welcome_text = yield call(GET_WELCOME)

    yield put({ type: "INDEX_TIME_FETCH_SUCCESSED", payload: { welcome_time: welcome_time, welcome_text: welcome_text, welcome_date: welcome_date } });
}
