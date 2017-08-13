import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { push } from 'react-router-redux';

import userManager from '../../services/userManager';


class LoginRedirectPage extends Component {

    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {

        userManager.signinPopupCallback();
    }

    render() {
        return (<div>Redirecting...</div>);
    }
}


function mapStateToProps(state) {

    return { model: state.LoginRedirectPageViewModel }
}

function mapDispatchToProps(dispatch) {

    return { dispatch: dispatch }
}

export default connect(mapStateToProps)(LoginRedirectPage);
