import { take, put, select, call, fork, takeLatest } from 'redux-saga/effects'
import { message } from 'antd'
import { toast } from '../services/errors'

import constants from '../configs/constants';

import { FETCH_SENTENCE_RANDOM_GET, FETCH_SENTENCE_HEART_PUT } from '../services/sentence'

export function* FETCH_SENTENCE_RANDOM() {

    const { data, error } = yield call(FETCH_SENTENCE_RANDOM_GET);
    if (error) return toast(error);
    yield put({ type: "INDEX_SENTENCE_FETCH_SUCCEED", payload: data });
}

export function* FETCH_SENTENCE_HEART({ payload }) {

    const { data, error } = yield call(FETCH_SENTENCE_HEART_PUT, payload.sentence);
    if (error) return toast(error);

    var sentence_heart_icon = payload.sentence_heart_icon == constants.SENTENCE_HEART_ICONS_EMPTY
        ? constants.SENTENCE_HEART_ICONS
        : constants.SENTENCE_HEART_ICONS_EMPTY;

    yield put({ type: "INDEX_SENTENCE_HEART_FETCH_SUCCEED", payload: sentence_heart_icon });

    message.success(
        action.payload.sentence_heart_icon == constants.SENTENCE_HEART_ICONS_EMPTY
            ? '已收藏，可以在我的收藏中查看'
            : '已取消收藏'
    )
}