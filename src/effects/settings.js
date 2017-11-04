import { take, put, select, call, fork, takeLatest } from 'redux-saga/effects'
import { message } from 'antd'
import { toast } from '../services/errors'


export function* TOGGLE_SETTINGS_MODAL({ payload }) {
    yield put({ type: "INDEX_SETTINGS_MODAL_TOGGLE_SUCCEED", payload: payload.settings_modal_visbale });
}

export function* TOGGLE_SETTINGS_MODAL_COMPONENT({ payload }) {
    yield put({ type: "INDEX_SETTINGS_MODAL_COMPONENT_CHANGED", payload: payload.component });
}


