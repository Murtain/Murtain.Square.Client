import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import createOidcMiddleware, { OidcProvider, loadUser } from 'redux-oidc';
import createHistory from 'history/createHashHistory';
import createSagaMiddleware from 'redux-saga';

import routes from './router';
import reducers from './reducers';
import effects from './effects'
import userManager from './services/userManager';


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Build the middleware for oidc-client
const oidcMiddleware = createOidcMiddleware(userManager);

// Build the middleware for intercepting and dispatching navigation actions
const routeMiddleware = routerMiddleware(history)

// create store
const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware, oidcMiddleware, routeMiddleware)
)

// run sagas
sagaMiddleware.run(effects);


ReactDOM.render(
    <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
            <ConnectedRouter history={history}>
                {routes}
            </ConnectedRouter>
        </OidcProvider>
    </Provider>
    , document.getElementById('root')
);

