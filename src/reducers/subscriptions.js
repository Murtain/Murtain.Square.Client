import { SESSION_TERMINATED, USER_EXPIRED } from 'redux-oidc';

import * as ACTION_TYPE from '../constants';


const initialState = {
  todos: []
};

export default function reducer(state = initialState, action) {

  switch (action.type) {

    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return Object.assign({}, { ...state }, { todos: [] });


    case ACTION_TYPE.TODOS_FETCH_START:
      return Object.assign({}, { ...state }, { todos: [] });

    case ACTION_TYPE.TODOS_FETCH_SUCCEEDED:
      return Object.assign({}, { ...state }, { todos: action.payload });

    case ACTION_TYPE.TODOS_FETCH_FAILED:
      return Object.assign({}, { ...state }, { todos: action.payload });

    case ACTION_TYPE.OIDC_LOAD_USER:
      return Object.assign({}, { ...state }, { todos: [] });

    default:
      return state;
  }
}


