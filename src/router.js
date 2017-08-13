import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage             from './containers/home/index';
import NotFoundPage         from './containers/404';
import LoginRedirectPage    from './containers/redirect';


const routes = (
    <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/404" component={NotFoundPage} />
        <Route path="/callback" component={LoginRedirectPage} />
    </div>
);

export default routes