import { take, put, select, call, fork, takeLatest } from 'redux-saga/effects'
import { message } from 'antd'
import { toast } from '../services/errors'


import { FETCH_FOCUS_POST, FETCH_FOCUS_COMPLATE_PUT, FETCH_FOCUS_STAR_PUT, FETCH_FOCUS_DELETE, FETCH_FOCUS, FETCH_FOCUS_NOW } from '../services/focus'

export function* FETCH_FOCUS_TODAY_STAR() {

    const { data, error } = yield call(FETCH_FOCUS_NOW);
    if (error) return toast(error);
    yield put({ type: "INDEX_FETCH_FOCUSES_NOW_SUCCEED", payload: data ? data.content : '' });
}
export function* FETCH_FOCUSES() {

    yield put({ type: INDEX_FETCH_FOCUSES_START });
    const { data, error } = yield call(FETCH_FOCUS);
    if (error) return toast(error);

    yield put({ type: "INDEX_FETCH_FOCUSES_SUCCEED", payload: data });
}
export function* FETCH_FOCUS_COMPLATE({ payload }) {
    const { error } = yield call(FETCH_FOCUS_COMPLATE_PUT, payload.key);

    if (error) return toast(error);

    payload.selected
        ? message.success('已将任务标记完成')
        : message.warning('已取消任务完成标记');

    yield call(FETCH_FOCUSES);
    yield call(FETCH_FOCUS_TODAY_STAR);
}
export function* FETCH_FOCUS_REMOVE({ payload }) {

    const { error } = yield call(FETCH_FOCUS_DELETE, payload.key);
    if (error) return toast(error);
    message.success('已将任务从清单中移除');

    yield call(FETCH_FOCUSES);
    yield call(FETCH_FOCUS_TODAY_STAR);

}
export function* FETCH_FOCUS_STAR({ payload }) {

    const { error } = yield call(FETCH_FOCUS_STAR_PUT, payload.key);
    if (error) return toast(error);

    message.success('已将任务固定到桌面');
    yield call(FETCH_FOCUSES);
    yield call(FETCH_FOCUS_TODAY_STAR);

}
export function* FETCH_FOCUS_ADD({ payload }) {

    const { error } = yield call(FETCH_FOCUS_POST, { content: payload.focus });

    if (error) return toast(error);

    yield put({ type: "INDEX_FOCUS_ADD_SUCCEED", payload: payload.focus });
    message.success('成功添加任务到清单');

    yield call(FETCH_FOCUSES);
    yield call(FETCH_FOCUS_TODAY_STAR);
}

export function* TOGGLE_FOCUS_ADD_MODAL({ payload }) {
    yield put({ type: "INDEX_FOCUS_MODAL_TOGGLE_SUCCEED", payload: payload.focus_modal_visbale });
}