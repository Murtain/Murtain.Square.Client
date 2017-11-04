import { take, put, select, call, fork, takeLatest } from 'redux-saga/effects'


import { FETCH_FOCUS_TODAY_STAR, FETCH_FOCUSES, FETCH_FOCUS_COMPLATE, FETCH_FOCUS_REMOVE, FETCH_FOCUS_STAR, FETCH_FOCUS_ADD,TOGGLE_FOCUS_ADD_MODAL } from './focus'
import { FETCH_WEATHER_TODAY } from './weather'
import { FETCH_SENTENCE_RANDOM, FETCH_SENTENCE_HEART } from './sentence'
import { FETCH_USER_INFO } from './user'
import { FETCH_WELCOME_TIME } from './clock'
import { TOGGLE_SETTINGS_MODAL, TOGGLE_SETTINGS_MODAL_COMPONENT } from './settings'


export default function* rootSaga() {

  yield takeLatest("OIDC_LOAD_USER", FETCH_USER_INFO);

  yield takeLatest("INDEX_TIME_FETCH", FETCH_WELCOME_TIME);

  yield takeLatest("INDEX_WEATHER_FETCH", FETCH_WEATHER_TODAY);

  yield takeLatest("INDEX_SENTENCE_FETCH", FETCH_SENTENCE_RANDOM);
  yield takeLatest("INDEX_SENTENCE_HEART_FETCH", FETCH_SENTENCE_HEART);

  yield takeLatest("INDEX_SETTINGS_MODAL_TOGGLE", TOGGLE_SETTINGS_MODAL);
  yield takeLatest("INDEX_SETTINGS_MODAL_COMPONENT", TOGGLE_SETTINGS_MODAL_COMPONENT);

  yield takeLatest("INDEX_FOCUS_MODAL_TOGGLE", TOGGLE_FOCUS_ADD_MODAL);

  yield takeLatest("INDEX_FOCUS_ADD", FETCH_FOCUS_ADD);
  yield takeLatest("INDEX_FOCUS_REMOVE", FETCH_FOCUS_REMOVE);
  yield takeLatest("INDEX_FOCUS_COMPLETE", FETCH_FOCUS_COMPLATE);
  yield takeLatest("INDEX_FOCUS_PIN", FETCH_FOCUS_STAR);
  yield takeLatest("INDEX_FOCUSES_FETCH", FETCH_FOCUSES);
  yield takeLatest("INDEX_FETCH_FOCUSES_NOW", FETCH_FOCUS_TODAY_STAR);

}