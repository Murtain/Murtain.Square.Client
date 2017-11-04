import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';


import indexReducer from './home';

import focus from './focus';
import sentence from './sentence';
import weather from './weather';
import clock from './clock';
import settings from './settings';

const reducer = combineReducers(
    {
        routing: routerReducer,
        index: indexReducer,


        oidc: oidcReducer,

        focus: focus,
        sentence: sentence,
        weather: weather,
        clock: clock,
        settings: settings,
    }
);

export default reducer;
