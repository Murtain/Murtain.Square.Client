import { take, put, select, call, fork, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';

import * as date_managaer from '../services/dateExtensions';
import * as square_service from '../services/avatar';
import * as todo_service from '../services/todos/todo-services';


import * as ACTION_TYPE from '../constants';

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


function* fetch_todos(payload) {

  try {

    yield put({ type: ACTION_TYPE.TODOS_FETCH_START });

    const todos = yield call(todo_service.fetch_todos, payload);

    yield put({ type: ACTION_TYPE.TODOS_FETCH_SUCCEEDED, payload: todos });


  } catch (e) {
    yield put({ type: ACTION_TYPE.TODOS_FETCH_FAILED, message: e.message });
  }
}

function* fetch_user_info() {
  const user = yield call(todo_service.get_user);
  yield put({ type: 'redux-oidc/USER_FOUND', payload: user });
}

function* fetch_sentence_random() {
  const sentence = yield call(square_service.fetch_sentence_random);
  yield put({ type: ACTION_TYPE.INDEX_SENTENCE_FETCH_SUCCEED, payload: sentence });
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

  const welcome_date = yield call(date_managaer.get_date);
  const welcome_time = yield call(date_managaer.get_time);
  const welcome_text = yield call(date_managaer.get_welcome);

  yield put({ type: ACTION_TYPE.INDEX_TIME_FETCH_SUCCESSED, payload: { welcome_time: welcome_time, welcome_text: welcome_text, welcome_date: welcome_date } });

}

function* fetch_weather() {
  const weather = yield call(square_service.fetch_weather_with_ip);
  yield put({ type: ACTION_TYPE.INDEX_WEATHER_FETCH_SUCCEED, payload: weather });
}

function* fetch_focuses() {
  yield put({ type: ACTION_TYPE.INDEX_FETCH_FOCUSES_START });
  yield delay(2000);
  yield put({ type: ACTION_TYPE.INDEX_FETCH_FOCUSES_SUCCEED });
}

function* fetch_put_focus_complete() {

}

function* fetch_delete_focus_remove(){

}

function* fetch_put_focus_star(){

}

function* fetch_post_focus_add(action) {

  yield put({ type: ACTION_TYPE.INDEX_FOCUS_ADD_SUCCEED, payload: action.payload.focus });
  message.success('成功添加任务到清单');

  yield put({ type: ACTION_TYPE.INDEX_FETCH_FOCUSES_START });
  yield delay(2000);
  yield put({ type: ACTION_TYPE.INDEX_FETCH_FOCUSES_SUCCEED });
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
  yield takeLatest(ACTION_TYPE.INDEX_FOCUS_ADD, fetch_post_focus_add);
  yield takeLatest(ACTION_TYPE.INDEX_FOCUSES_FETCH, fetch_focuses);

}