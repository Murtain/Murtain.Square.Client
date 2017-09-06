import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Popover } from 'antd';
import { push } from 'react-router-redux';


import userManager from '../services/userManager';
import * as ACTION_TYPE from '../constants'

class Authorize extends Component {

    constructor(props, context) {
        super(props, context)

        this.signin = this.signin.bind(this);
    }

    componentDidMount() {

    }
    signin() {
        event.preventDefault();
        const { dispatch } = this.props;
        userManager.signinPopup().then(function (user) {
            // dispatch(push('/' + '?_k=' + Math.random().toString(32).substr(2).slice(2, 8)));
            // window.location.reload();
            dispatch({ type: ACTION_TYPE.OIDC_LOAD_USER });
        });
    }

    signout() {
        userManager.signoutRedirect();
    }

    render() {
        const { user } = this.props.oidc;

        if (user == null) {
            return (
                <div className="login">
                    <a className="btn btn-login" onClick={this.signin} >登录</a>
                </div>
            );
        }

        return (
            <Popover
                placement="bottom"
                trigger="click"
                content={<a onClick={this.signout}>注销</a>}>
                <div className="profile">
                    <img className="profile-avatar" src={user.profile.avatar} />
                    <span className="profile-nick">{user.profile.nick_name}</span>
                </div>
            </Popover>
        )

    }
}

Authorize.propTypes = {

};

export default connect(
    (state) => {
        return state;
    },
    (dispatch) => {
        return { dispatch: dispatch }
    }
)(Authorize);