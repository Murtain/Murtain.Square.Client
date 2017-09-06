import { take, put, select, call, fork, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import { ErrorHandler } from '../services/errors';

import * as date_service from '../services/date';
import * as square_service from '../services/avatar';
import * as focus_service from '../services/focus';

import * as ACTION_TYPE from '../constants';

import userManager from '../services/userManager';




export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


function* fetch_user_info() {

  const { user, error } = userManager.getUser(user => { return { user } }).catch(error => { return { error } });

  if (error) return ErrorHandler(error);

  yield put({ type: 'redux-oidc/USER_FOUND', payload: user });
}


function* fetch_sentence_random() {

  const { data, error } = yield call(square_service.fetch_sentence_random);

  if (error) return ErrorHandler(error);

  yield put({ type: ACTION_TYPE.INDEX_SENTENCE_FETCH_SUCCEED, payload: data });
}

function* fetch_post_sentence_heart(action) {

  // yield call(square.fetchSentence);
  var sentence_heart_icon = 'http://static.x-dva.com/resources/images/svg/icon-heart-empty.svg';
  if (action.payload.sentence_heart_icon == sentence_heart_icon) {
    sentence_heart_icon = 'http://static.x-dva.com/resources/images/svg/icon-heart.svg';
  }
  yield put({ type: ACTION_TYPE.INDEX_SENTENCE_HEART_FETCH_SUCCEED, payload: sentence_heart_icon });

  if (action.payload.sentence_heart_icon == 'http://static.x-dva.com/resources/images/svg/icon-heart-empty.svg') {
    message.success('已收藏，可以在我的收藏中查看');
    return;
  } else {
    message.success('已取消收藏');
  }

}

function* fetch_welcome_time() {

  const welcome_date = yield call(date_service.get_date);
  const welcome_time = yield call(date_service.get_time);
  const welcome_text = yield call(date_service.get_welcome);

  yield put({ type: ACTION_TYPE.INDEX_TIME_FETCH_SUCCESSED, payload: { welcome_time: welcome_time, welcome_text: welcome_text, welcome_date: welcome_date } });

}

function* fetch_weather() {

  const { data, error } = yield call(square_service.fetch_weather_with_ip);

  if (error) return ErrorHandler(error);

  yield put({ type: ACTION_TYPE.INDEX_WEATHER_FETCH_SUCCEED, payload: data });
}

function* fetch_focus_now() {

  const { data, error } = yield call(focus_service.fetch_focus_now);

  if (error) return ErrorHandler(error);

  yield put({ type: ACTION_TYPE.INDEX_FETCH_FOCUSES_NOW_SUCCEED, payload: data ? data.content : '' });
}

function* fetch_focuses() {

  yield put({ type: ACTION_TYPE.INDEX_FETCH_FOCUSES_START });

  const { data, error } = yield call(focus_service.fetch_focus);

  if (error) return ErrorHandler(error);

  yield put({ type: ACTION_TYPE.INDEX_FETCH_FOCUSES_SUCCEED, payload: data });
}

function* fetch_focus_complate_put(action) {
  const { error } = yield call(focus_service.fetch_focus_complate_put, action.payload.key);

  console.log(error);
  if (error) return ErrorHandler(error);

  action.payload.selected ? message.success('已将任务标记完成') : message.warning('已取消任务完成标记');

  yield call(fetch_focuses);
  yield call(fetch_focus_now);
}

function* fetch_focus_delete(action) {

  const { error } = yield call(focus_service.fetch_focus_delete, action.payload.key);

  if (error) return ErrorHandler(error);

  message.success('已将任务从清单中移除');

  yield call(fetch_focuses);
  yield call(fetch_focus_now);

}

function* fetch_focus_star_put(action) {

  const { error } = yield call(focus_service.fetch_focus_star_put, action.payload.key);

  if (error) return ErrorHandler(error);

  message.success('已将任务固定到桌面');
  yield call(fetch_focuses);
  yield call(fetch_focus_now);

}

function* fetch_focus_post(action) {

  const { error } = yield call(focus_service.fetch_focus_post, { content: action.payload.focus });

  if (error) return ErrorHandler(error);

  yield put({ type: ACTION_TYPE.INDEX_FOCUS_ADD_SUCCEED, payload: action.payload.focus });
  message.success('成功添加任务到清单');

  yield call(fetch_focuses);
  yield call(fetch_focus_now);

}

function* toggle_settings_modal(action) {
  yield put({ type: ACTION_TYPE.INDEX_SETTINGS_MODAL_TOGGLE_SUCCEED, payload: action.payload.settings_modal_visbale });
}

function* toggle_focus_add_modal(action) {
  yield put({ type: ACTION_TYPE.INDEX_FOCUS_MODAL_TOGGLE_SUCCEED, payload: action.payload.focus_modal_visbale });
}


export default function* rootSaga() {

  yield takeLatest(ACTION_TYPE.OIDC_LOAD_USER, fetch_user_info);

  yield takeLatest(ACTION_TYPE.INDEX_TIME_FETCH, fetch_welcome_time);
  yield takeLatest(ACTION_TYPE.INDEX_WEATHER_FETCH, fetch_weather);
  yield takeLatest(ACTION_TYPE.INDEX_SENTENCE_FETCH, fetch_sentence_random);
  yield takeLatest(ACTION_TYPE.INDEX_SENTENCE_HEART_FETCH, fetch_post_sentence_heart);

  yield takeLatest(ACTION_TYPE.INDEX_SETTINGS_MODAL_TOGGLE, toggle_settings_modal);

  yield takeLatest(ACTION_TYPE.INDEX_FOCUS_MODAL_TOGGLE, toggle_focus_add_modal);

  yield takeLatest(ACTION_TYPE.INDEX_FOCUS_ADD, fetch_focus_post);
  yield takeLatest(ACTION_TYPE.INDEX_FOCUS_REMOVE, fetch_focus_delete);
  yield takeLatest(ACTION_TYPE.INDEX_FOCUS_COMPLETE, fetch_focus_complate_put);
  yield takeLatest(ACTION_TYPE.INDEX_FOCUS_PIN, fetch_focus_star_put);
  yield takeLatest(ACTION_TYPE.INDEX_FOCUSES_FETCH, fetch_focuses);

  yield takeLatest(ACTION_TYPE.INDEX_FETCH_FOCUSES_NOW, fetch_focus_now);

}